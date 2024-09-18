<template>
  <a-layout class="app">
    <a-layout-header>
      <div class="logo">NEORON</div>
      <a-menu theme="dark" mode="horizontal" :selectedKeys="selectedKeys">
        <a-menu-item key="1" @click="navigateTo('/')">Home</a-menu-item>
        <a-menu-item key="2" @click="navigateTo('/voos')">Voos</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content>
      <router-view />
    </a-layout-content>
    <a-layout-footer>
      NEORON ©2024 Created by Matheus
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Roteador e rota
const route = useRoute();
const router = useRouter();

// Chave selecionada no menu
const selectedKeys = computed(() => {
  return [route.path];
});

// Navega para uma rota específica
const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #f0f2f5;
}

.logo {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.a-layout-header {
  background: #001529;
  padding: 0;
}

.a-menu {
  line-height: 64px;
}

.a-layout-footer {
  text-align: center;
  padding: 16px 0;
}
</style>
