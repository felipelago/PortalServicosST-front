<template>
    <div class="cadastro-empresa-page d-flex flex-column">
        <!-- Barra superior -->
        <div class="top-bar d-flex justify-content-between p-3">
            <button class="btn btn-outline-light" @click="irParaDashboard">Início</button>
            <button class="btn btn-outline-light" @click="logout">Logout</button>
        </div>

        <!-- Conteúdo principal centralizado -->
        <main class="d-flex align-items-center justify-content-center p-4 flex-grow-1">
            <div class="card p-4 shadow" style="width: 600px; border-radius: 8px;">
                <h2 class="mb-4">Cadastro de Empresa</h2>

                <!-- Seleção do Tipo de Pessoa -->
                <div class="mb-3">
                    <label class="form-label">Tipo de Pessoa</label>
                    <select class="form-select" v-model="tipoPessoa">
                        <option value="">Selecione...</option>
                        <option value="JURIDICA">Pessoa Jurídica</option>
                        <option value="FISICA">Pessoa Física</option>
                        <option value="ESTRANGEIRA">Pessoa Estrangeira</option>
                    </select>
                </div>

                <!-- Formulário para Pessoa Jurídica -->
                <form v-if="tipoPessoa === 'JURIDICA'" @submit.prevent="submitEmpresaJuridica">
                    <h4>Pessoa Jurídica</h4>
                    <div class="mb-3">
                        <label class="form-label">Razão Social</label>
                        <input type="text" class="form-control" v-model="empresaJuridica.razaoSocial" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">CNPJ</label>
                        <input type="text" class="form-control" v-model="empresaJuridica.cnpj" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Nome Fantasia</label>
                        <input type="text" class="form-control" v-model="empresaJuridica.nomeFantasia" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Perfil</label>
                        <select class="form-select" v-model="empresaJuridica.perfil" required>
                            <option value="">Selecione...</option>
                            <option value="Despachante">Despachante</option>
                            <option value="Beneficiário">Beneficiário</option>
                            <option value="Consignatário">Consignatário</option>
                            <option value="Armador">Armador</option>
                            <option value="Agente de Carga">Agente de Carga</option>
                            <option value="Transportadora">Transportadora</option>
                            <option value="Novo usuário">Novo usuário</option>
                        </select>
                    </div>
                    <div v-if="usuarioLogado && ['EMPRESA_MASTER', 'EMPRESA_LISTA', 'EMPRESA_EDICAO'].includes(usuarioLogado.permissao)"
                        class="mb-3">
                        <label class="form-label">
                            Como seu usuário é interno, digite o e-mail do usuário externo responsável
                        </label>
                        <input type="text" class="form-control" v-model="empresaJuridica.usuarioExternoId" required />
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
                </form>

                <!-- Formulário para Pessoa Física -->
                <form v-if="tipoPessoa === 'FISICA'" @submit.prevent="submitEmpresaFisica">
                    <h4>Pessoa Física</h4>
                    <div class="mb-3">
                        <label class="form-label">Nome Completo</label>
                        <input type="text" class="form-control" v-model="empresaFisica.nome" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">CPF</label>
                        <input type="text" class="form-control" v-model="empresaFisica.cpf" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Nome Fantasia</label>
                        <input type="text" class="form-control" v-model="empresaFisica.nomeFantasia" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Perfil</label>
                        <select class="form-select" v-model="empresaFisica.perfil" required>
                            <option value="">Selecione...</option>
                            <option value="Despachante">Despachante</option>
                            <option value="Beneficiário">Beneficiário</option>
                            <option value="Consignatário">Consignatário</option>
                            <option value="Armador">Armador</option>
                            <option value="Agente de Carga">Agente de Carga</option>
                            <option value="Transportadora">Transportadora</option>
                            <option value="Novo usuário">Novo usuário</option>
                        </select>
                    </div>
                    <div v-if="usuarioLogado && ['EMPRESA_MASTER', 'EMPRESA_LISTA', 'EMPRESA_EDICAO'].includes(usuarioLogado.permissao)"
                        class="mb-3">
                        <label class="form-label">
                            Como seu usuário é interno, digite o e-mail do usuário externo responsável
                        </label>
                        <input type="text" class="form-control" v-model="empresaFisica.usuarioExternoId" required />
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
                </form>

                <!-- Formulário para Pessoa Estrangeira -->
                <form v-if="tipoPessoa === 'ESTRANGEIRA'" @submit.prevent="submitEmpresaEstrangeira">
                    <h4>Pessoa Estrangeira</h4>
                    <div class="mb-3">
                        <label class="form-label">Razão Social</label>
                        <input type="text" class="form-control" v-model="empresaEstrangeira.razaoSocial" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Identificador Estrangeiro</label>
                        <input type="text" class="form-control" v-model="empresaEstrangeira.identificadorEstrangeiro"
                            required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Nome Fantasia</label>
                        <input type="text" class="form-control" v-model="empresaEstrangeira.nomeFantasia" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Perfil</label>
                        <select class="form-select" v-model="empresaEstrangeira.perfil" required>
                            <option value="">Selecione...</option>
                            <option value="Despachante">Despachante</option>
                            <option value="Beneficiário">Beneficiário</option>
                            <option value="Consignatário">Consignatário</option>
                            <option value="Armador">Armador</option>
                            <option value="Agente de Carga">Agente de Carga</option>
                            <option value="Transportadora">Transportadora</option>
                            <option value="Novo usuário">Novo usuário</option>
                        </select>
                    </div>
                    <div v-if="usuarioLogado && ['EMPRESA_MASTER', 'EMPRESA_LISTA', 'EMPRESA_EDICAO'].includes(usuarioLogado.permissao)"
                        class="mb-3">
                        <label class="form-label">
                            Como seu usuário é interno, digite o e-mail do usuário externo responsável
                        </label>
                        <input type="text" class="form-control" v-model="empresaEstrangeira.usuarioExternoId"
                            required />
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
                </form>
            </div>
        </main>

        <!-- Modal de Alerta -->
        <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="alertModalLabel">Atenção</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {{ mensagemErro }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import empresaService from '@/services/empresaService';

export default {
    data() {
        return {
            tipoPessoa: '',
            usuarioLogado: JSON.parse(localStorage.getItem('usuarioLogado')) || null,
            mensagemErro: '',

            empresaJuridica: {
                razaoSocial: '',
                cnpj: '',
                nomeFantasia: '',
                perfil: '',
                usuarioResponsavelId: null,
                usuarioExternoId: ''
            },
            empresaFisica: {
                nome: '',
                cpf: '',
                nomeFantasia: '',
                perfil: '',
                usuarioResponsavelId: null,
                usuarioExternoId: ''
            },
            empresaEstrangeira: {
                razaoSocial: '',
                identificadorEstrangeiro: '',
                nomeFantasia: '',
                perfil: '',
                usuarioResponsavelId: null,
                usuarioExternoId: ''
            }
        };
    },

    methods: {
        irParaDashboard() {
            this.$router.push('/dashboard');
        },
        logout() {
            localStorage.removeItem('usuarioLogado');
            this.$router.push('/login');
        },

        mostrarModal(mensagem) {
            this.mensagemErro = mensagem;
            const modalElement = document.getElementById('alertModal');
            if (modalElement) {
                const modal = new window.bootstrap.Modal(modalElement);
                modal.show();
            }
        },

        validarCNPJ(cnpj) {
            return cnpj && cnpj.length === 14;
        },
        validarCPF(cpf) {
            return cpf && cpf.length === 11;
        },
        validarPerfil(perfil) {
            return perfil !== '';
        },

        async submitEmpresaJuridica() {
            if (!this.validarCNPJ(this.empresaJuridica.cnpj)) {
                this.mostrarModal("CNPJ inválido");
                return;
            }
            if (!this.validarPerfil(this.empresaJuridica.perfil)) {
                this.mostrarModal("Selecione um perfil para a empresa");
                return;
            }

            if (
                this.usuarioLogado &&
                ['EMPRESA_MASTER', 'EMPRESA_LISTA', 'EMPRESA_EDICAO'].includes(this.usuarioLogado.permissao)
            ) {
                this.empresaJuridica.usuarioResponsavelId = this.empresaJuridica.usuarioExternoId;
            } else {
                this.empresaJuridica.usuarioResponsavelId = this.usuarioLogado?.id;
            }

            try {
                await empresaService.cadastrarEmpresaJuridica(this.empresaJuridica);
                if (
                    this.usuarioLogado &&
                    ['EMPRESA_MASTER', 'EMPRESA_LISTA', 'EMPRESA_EDICAO'].includes(this.usuarioLogado.permissao)
                ) {
                    this.mostrarModal("Empresa cadastrada e aprovada com sucesso");
                } else {
                    this.mostrarModal("Empresa cadastrada com sucesso, aguarde aprovação");
                }
            } catch (error) {
                let errorMsg = 'Erro ao cadastrar empresa jurídica.';
                if (error.response && error.response.data && error.response.data.message) {
                    errorMsg = error.response.data.message;
                }
                this.mostrarModal(errorMsg);
            }
        },

        async submitEmpresaFisica() {
            if (!this.validarCPF(this.empresaFisica.cpf)) {
                this.mostrarModal("CPF inválido");
                return;
            }
            if (!this.validarPerfil(this.empresaFisica.perfil)) {
                this.mostrarModal("Selecione um perfil para a empresa");
                return;
            }

            if (
                this.usuarioLogado &&
                ['EMPRESA_MASTER', 'EMPRESA_LISTA', 'EMPRESA_EDICAO'].includes(this.usuarioLogado.permissao)
            ) {
                this.empresaFisica.usuarioResponsavelId = this.empresaFisica.usuarioExternoId;
            } else {
                this.empresaFisica.usuarioResponsavelId = this.usuarioLogado?.id;
            }

            try {
                await empresaService.cadastrarEmpresaFisica(this.empresaFisica);
                if (
                    this.usuarioLogado &&
                    ['EMPRESA_MASTER', 'EMPRESA_LISTA', 'EMPRESA_EDICAO'].includes(this.usuarioLogado.permissao)
                ) {
                    this.mostrarModal("Empresa cadastrada e aprovada com sucesso");
                } else {
                    this.mostrarModal("Empresa cadastrada com sucesso, aguarde aprovação");
                }
            } catch (error) {
                let errorMsg = 'Erro ao cadastrar empresa física.';
                if (error.response && error.response.data && error.response.data.message) {
                    errorMsg = error.response.data.message;
                }
                this.mostrarModal(errorMsg);
            }
        },

        async submitEmpresaEstrangeira() {
            if (!this.usuarioLogado) {
                this.mostrarModal("Usuário não encontrado. Faça login novamente.");
                return;
            }

            if (
                this.usuarioLogado &&
                ['EMPRESA_MASTER', 'EMPRESA_LISTA', 'EMPRESA_EDICAO'].includes(this.usuarioLogado.permissao)
            ) {
                this.empresaEstrangeira.usuarioResponsavelId = this.empresaEstrangeira.usuarioExternoId;
            } else {
                this.empresaEstrangeira.usuarioResponsavelId = this.usuarioLogado.id;
            }

            try {
                await empresaService.cadastrarEmpresaEstrangeira(this.empresaEstrangeira);
                if (
                    this.usuarioLogado &&
                    ['EMPRESA_MASTER', 'EMPRESA_LISTA', 'EMPRESA_EDICAO'].includes(this.usuarioLogado.permissao)
                ) {
                    this.mostrarModal("Empresa cadastrada e aprovada com sucesso");
                } else {
                    this.mostrarModal("Empresa cadastrada com sucesso, aguarde aprovação");
                }
            } catch (error) {
                let errorMsg = 'Erro ao cadastrar empresa estrangeira.';
                if (error.response && error.response.data && error.response.data.message) {
                    errorMsg = error.response.data.message;
                }
                this.mostrarModal(errorMsg);
            }
        }
    }
};
</script>

<style scoped>
.cadastro-empresa-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #0abac7 0%, #0b86c7 100%);
    margin: 0;
    padding: 0;
}

.top-bar {
    background: transparent;
}
</style>