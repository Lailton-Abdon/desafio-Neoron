<template>
    <a-card :title="isEdit ? 'Editar Voo' : 'Criar Voo'" :loading="loading" class="voo-form-card">
        <a-form @submit.prevent="handleSubmit">
            <a-form-item label="Código" :rules="[{ required: true, message: 'O código é obrigatório' }]">
                <a-input v-model:value="voo.codigo" />
            </a-form-item>
            <a-form-item label="Origem" :rules="[{ required: true, message: 'A origem é obrigatória' }]">
                <a-input v-model:value="voo.origem" placeholder="Cidade de origem" />
            </a-form-item>
            <a-form-item label="Destino" :rules="[{ required: true, message: 'O destino é obrigatório' }]">
                <a-input v-model:value="voo.destino" placeholder="Cidade de destino" />
            </a-form-item>
            <a-form-item label="Data" :rules="[{ required: true, message: 'A data é obrigatória' }]">
                <a-date-picker v-model:value="voo.data" format="DD/MM/YYYY" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">Salvar</a-button>
                <a-button @click="handleCancel">Cancelar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createVoo, updateVoo, getVooById } from '../../services/vooService';
import { Voo } from '../../types/voo';

const route = useRoute();
const router = useRouter();

const voo = ref<Voo>({
    id: '',
    codigo: '',
    origem: '',
    destino: '',
    data: new Date(),
});

const loading = ref(false);
const isEdit = ref(false);

const fetchVooDetails = async () => {
    const id = route.params.id as string;
    if (id) {
        isEdit.value = true;
        loading.value = true;
        try {
            const data = await getVooById(id);
            voo.value = data;
        } catch (error) {
            console.error('Erro ao buscar voo:', error);
        } finally {
            loading.value = false;
        }
    }
};

const handleSubmit = async () => {
    loading.value = true;
    try {
        if (isEdit.value) {
            await updateVoo(voo.value.id, voo.value);
        } else {
            await createVoo(voo.value);
        }
        router.push('/voos');
    } catch (error) {
        console.error('Erro ao salvar voo:', error);
    } finally {
        loading.value = false;
    }
};

const handleCancel = () => {
    router.push('/voos');
};

onMounted(() => {
    fetchVooDetails();
});
</script>

<style scoped>
.voo-form-card {
    max-width: 600px;
    margin: 0 auto;
}

a-card {
    border-radius: 8px;
}

a-button {
    margin-right: 10px;
}
</style>