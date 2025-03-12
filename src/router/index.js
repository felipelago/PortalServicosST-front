import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import CadastroEmpresa from '../views/CadastroEmpresa.vue';
import AdministracaoEmpresas from '../views/AdministracaoEmpresas.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginView },
    { path: '/dashboard', component: DashboardView },
    { path: '/cadastro-empresa', component: CadastroEmpresa },
    { path: '/administracao-empresas', component: AdministracaoEmpresas },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
