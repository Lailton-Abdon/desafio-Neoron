<template>
    <a-card title="Editar Voo" :loading="loading">
        <a-form @submit.prevent="submitForm">
            <a-form-item label="Código">
                <a-input v-model:value="voo.codigo" />
            </a-form-item>
            <a-form-item label="Origem">
                <a-input v-model:value="voo.origem" />
            </a-form-item>
            <a-form-item label="Destino">
                <a-input v-model:value="voo.destino" />
            </a-form-item>
            <a-form-item label="Data">
                <a-date-picker v-model:value="voo.data" format="DD/MM/YYYY" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" :loading="loading">Salvar</a-button>
                <a-button @click="goBack" style="margin-left: 8px">Cancelar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Voo } from '@/types/voo';

const route = useRoute();
const router = useRouter();
const store = useStore();

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
        await store.dispatch('voo/fetchVooById', id);
        const fetchedVoo = store.getters['voo/currentVoo'];
        if (fetchedVoo) {
            voo.value = fetchedVoo;
        }
    } catch (error) {
        console.error('Erro ao buscar detalhes do voo:', error);
    } finally {
        loading.value = false;
    }
};

const submitForm = async () => {
    const id = route.params.id as string;
    try {
        await store.dispatch('voo/updateVoo', { ...voo.value, id });
        router.push('/voos');
    } catch (error) {
        console.error('Erro ao atualizar voo:', error);
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
a-card {
    max-width: 600px;
    margin: 0 auto;
}

a-button {
    margin-top: 16px;
}
</style>