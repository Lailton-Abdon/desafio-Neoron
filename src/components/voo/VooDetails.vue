<template>
    <a-card title="Detalhes do Voo" :loading="loading" class="voo-details-card">
        <a-form>
            <a-form-item label="Código">
                <a-input v-model:value="voo.codigo" disabled />
            </a-form-item>
            <a-form-item label="Origem">
                <a-input v-model:value="voo.origem" disabled />
            </a-form-item>
            <a-form-item label="Destino">
                <a-input v-model:value="voo.destino" disabled />
            </a-form-item>
            <a-form-item label="Data">
                <a-date-picker v-model:value="voo.data" format="DD/MM/YYYY" disabled />
            </a-form-item>
        </a-form>
        <template #actions>
            <a-button @click="goBack">Voltar</a-button>
        </template>
    </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getVooById } from '../../services/vooService';
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

const loading = ref(true);

const fetchVooDetails = async () => {
    const id = route.params.id as string;
    try {
        const data = await getVooById(id);
        voo.value = data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do voo:', error);
    } finally {
        loading.value = false;
    }
};

const goBack = () => {
    router.push('/voos');
};

onMounted(() => {
    fetchVooDetails();
});
</script>

<style scoped>
.voo-details-card {
    max-width: 600px;
    margin: 0 auto;
}

a-card {
    border-radius: 8px;
}
</style>