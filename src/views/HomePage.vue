<template>
    <a-layout class="home-page">
        <a-layout-header>
            <div class="logo">Sistema de Gerenciamento de Voos</div>
        </a-layout-header>
        <a-layout-content>
            <a-card title="Bem-vindo ao Sistema de Gerenciamento de Voos">
                <p>Gerencie seus voos de forma eficiente e prática.</p>
                <a-button type="primary" @click="navigateTo('voos')">Ver Todos os Voos</a-button>
                <a-button type="default" @click="navigateTo('criar')">Criar Novo Voo</a-button>
            </a-card>
        </a-layout-content>
        <a-layout-footer>
            <p>© 2024 Sistema de Gerenciamento de Voos</p>
        </a-layout-footer>
    </a-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string) => {
    router.push(`/${path}`);
};
</script>

<style scoped>
.home-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

a-layout-header {
    background: #001529;
    color: #fff;
    text-align: center;
}

.logo {
    font-size: 24px;
    color: #fff;
    line-height: 64px;
}

a-layout-content {
    padding: 24px;
    background: #fff;
}

a-card {
    max-width: 600px;
    margin: 0 auto;
}

a-layout-footer {
    text-align: center;
    padding: 16px;
    background: #001529;
    color: #fff;
}
</style>