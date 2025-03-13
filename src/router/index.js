import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import CadastroEmpresa from '../views/CadastroEmpresa.vue';
import AdministracaoEmpresas from '../views/AdministracaoEmpresas.vue';
import CadastroUsuario from '../views/CadastroUsuario.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginView },
    { path: '/cadastro-usuario', component: CadastroUsuario },

    // Rotas que requerem login:
    {
        path: '/dashboard',
        component: DashboardView,
        meta: { requiresAuth: true }
    },
    {
        path: '/cadastro-empresa',
        component: CadastroEmpresa,
        meta: { requiresAuth: true }
    },
    {
        path: '/administracao-empresas',
        component: AdministracaoEmpresas,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Rota que verifica se o usuário está logado antes de prosseguir
router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (to.meta.requiresAuth && !user) {
        next('/login');
    } else {
        next();
    }
});

export default router;