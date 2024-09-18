import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

const app = createApp(App);

app.use(store); // Usa a store na aplicação

app.mount('#app');