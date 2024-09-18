<template>
    <a-card title="Lista de Voos">
        <a-table :columns="columns" :dataSource="voos" :loading="loading" rowKey="id">
            <template #action="{ record }">
                <a-space>
                    <a-button type="link" @click="viewDetails(record.id)">Detalhes</a-button>
                    <a-button type="link" @click="editVoo(record.id)">Editar</a-button>
                    <a-popconfirm title="Tem certeza que deseja excluir este voo?" @confirm="deleteVoo(record.id)"
                        okText="Sim" cancelText="Não">
                        <a-button type="link" danger>Excluir</a-button>
                    </a-popconfirm>
                </a-space>
            </template>
        </a-table>
    </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getVoos, deleteVooById } from '../../services/vooService';
import { Voo } from '../../types/voo';

const router = useRouter();
const voos = ref<Voo[]>([]); // Estado da lista de voos
const loading = ref(false); // Controle de carregamento

// Definição das colunas da tabela
const columns = [
    {
        title: 'Código',
        dataIndex: 'codigo',
        key: 'codigo',
    },
    {
        title: 'Origem',
        dataIndex: 'origem',
        key: 'origem',
    },
    {
        title: 'Destino',
        dataIndex: 'destino',
        key: 'destino',
    },
    {
        title: 'Data',
        dataIndex: 'data',
        key: 'data',
        customRender: ({ text }: { text: string }) => {
            return new Date(text).toLocaleDateString('pt-BR');
        },
    },
    {
        title: 'Ações',
        key: 'action',
        slots: { customRender: 'action' }, // Define slot para renderizar ações
    },
];

// Função para buscar a lista de voos da API
const fetchVoos = async () => {
    loading.value = true;
    try {
        const data = await getVoos();
        voos.value = data;
    } catch (error) {
        console.error('Erro ao buscar lista de voos:', error);
    } finally {
        loading.value = false;
    }
};

// Função para visualizar detalhes de um voo
const viewDetails = (id: string) => {
    router.push(`/voos/${id}`);
};

// Função para editar um voo
const editVoo = (id: string) => {
    router.push(`/voos/editar/${id}`);
};

// Função para excluir um voo
const deleteVoo = async (id: string) => {
    loading.value = true;
    try {
        await deleteVooById(id);
        fetchVoos(); // Recarrega a lista de voos após excluir
    } catch (error) {
        console.error('Erro ao excluir voo:', error);
    } finally {
        loading.value = false;
    }
};

// Carrega a lista de voos ao montar o componente
onMounted(() => {
    fetchVoos();
});
</script>

<style scoped>
a-card {
    max-width: 900px;
    margin: 20px auto;
}

a-table {
    margin-top: 20px;
}

a-button {
    margin-right: 10px;
}
</style>