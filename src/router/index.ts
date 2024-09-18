import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import VooList from '../views/VooList.vue';
import VooEdit from '../views/VooEdit.vue';
import VooDetails from '../views/VooDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/voos', component: VooList },
  { path: '/voos/edit/:id?', component: VooEdit },
  { path: '/voos/:id', component: VooDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
