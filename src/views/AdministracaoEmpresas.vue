<template>
    <div class="lista-empresas-page d-flex flex-column">
        <!-- Barra superior com botão Início (esquerda) e Logout (direita) -->
        <div class="top-bar d-flex justify-content-between p-3">
            <!-- Botão Início -->
            <button class="btn btn-outline-light" @click="irParaDashboard">Início</button>

            <!-- Botão Logout -->
            <button class="btn btn-outline-light" @click="logout">Logout</button>
        </div>

        <!-- Conteúdo principal -->
        <main class="container mt-4 flex-grow-1">
            <!-- Botão "Cadastrar Empresa" -->
            <div class="mb-3">
                <button class="btn btn-success" :title="hoverTitle" @mouseover="hoverTitle = 'Cadastrar Empresa'"
                    @mouseleave="hoverTitle = ''" @click="irParaCadastro">
                    <i class="bi bi-plus"></i>
                    <span v-if="hoverTitle" class="ms-1">{{ hoverTitle }}</span>
                </button>
            </div>

            <!-- Tabela de Empresas -->
            <div class="card p-3 shadow">
                <h4 class="mb-3">Lista de Empresas</h4>
                <table class="table table-bordered table-hover bg-white mb-0">
                    <thead>
                        <tr>
                            <th>Tipo de Pessoa</th>
                            <th>Razão Social</th>
                            <th>CNPJ</th>
                            <th>Identificador Estrangeiro</th>
                            <th>Nome Fantasia</th>
                            <th>Perfil</th>
                            <th>Status</th>
                            <th>Usuário Responsável (Email)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(empresa, index) in empresas" :key="index">
                            <td>{{ empresa.tipoPessoa || 'Sem dados' }}</td>
                            <td>{{ empresa.razaoSocial || 'Sem dados' }}</td>
                            <td>{{ empresa.cnpj || 'Sem dados' }}</td>
                            <td>{{ empresa.identificadorEstrangeiro || 'Sem dados' }}</td>
                            <td>{{ empresa.nomeFantasia || 'Sem dados' }}</td>
                            <td>{{ empresa.perfil || 'Sem dados' }}</td>
                            <td>{{ empresa.status || 'Sem dados' }}</td>
                            <td>{{ empresa.usuarioResponsavel?.email || 'Sem dados' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</template>

<script>
import empresaService from '@/services/empresaService';

export default {
    name: 'ListaEmpresasView',
    data() {
        return {
            empresas: [],
            hoverTitle: '',
        };
    },
    created() {
        this.buscarEmpresas();
    },
    methods: {
        async buscarEmpresas() {
            try {
                const response = await empresaService.listarEmpresas();
                this.empresas = response.data || [];
            } catch (error) {
                console.error('Erro ao buscar empresas:', error);
            }
        },
        irParaCadastro() {
            this.$router.push('/cadastro-empresa');
        },
        irParaDashboard() {
            this.$router.push('/dashboard');
        },
        logout() {
            localStorage.removeItem('usuarioLogado');
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.lista-empresas-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #0abac7 0%, #0b86c7 100%);
    margin: 0;
    padding: 0;
}

.top-bar {
    background: transparent;
}
</style>
