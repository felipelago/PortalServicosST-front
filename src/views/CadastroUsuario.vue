<template>
    <div class="cadastro-usuario-page d-flex align-items-center justify-content-center">
        <!-- Título/Logo (exemplo) -->
        <div class="text-center mb-4">
            <h1 class="mb-0" style="font-weight: 700; font-size: 2.5rem;">
                RIVER <span style="font-weight: 300;">PortHub</span>
            </h1>
        </div>

        <!-- Card para o formulário -->
        <div class="card p-4 shadow cadastro-card">
            <h4 class="text-center mb-4">Cadastro de Usuário</h4>

            <!-- Exibe mensagens de erro -->
            <div v-if="errorMessage" class="alert alert-danger text-center">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="cadastrarUsuario">
                <!-- Campo Nome Completo -->
                <div class="mb-3">
                    <label class="form-label fw-semibold">Nome Completo</label>
                    <input type="text" class="form-control" placeholder="Informe seu nome completo"
                        v-model="nomeCompleto" required />
                </div>

                <!-- Campo E-mail -->
                <div class="mb-3">
                    <label class="form-label fw-semibold">E-mail</label>
                    <input type="email" class="form-control" placeholder="Informe seu email" v-model="email" required />
                </div>

                <!-- Campo Senha -->
                <div class="mb-3">
                    <label class="form-label fw-semibold">Senha</label>
                    <input type="password" class="form-control" placeholder="Informe sua senha" v-model="senha"
                        required />
                </div>

                <!-- Campo Confirmar Senha -->
                <div class="mb-3">
                    <label class="form-label fw-semibold">Confirmar Senha</label>
                    <input type="password" class="form-control" placeholder="Confirme sua senha"
                        v-model="confirmarSenha" required />
                </div>

                <!-- Campo Permissão (Select) -->
                <div class="mb-4">
                    <label class="form-label fw-semibold">Permissão</label>
                    <select class="form-select" v-model="permissao" required>
                        <option value="">Selecione...</option>
                        <option value="EMPRESA_CADASTRO">EMPRESA_CADASTRO</option>
                        <option value="EMPRESA_MASTER">EMPRESA_MASTER</option>
                        <option value="EMPRESA_LISTA">EMPRESA_LISTA</option>
                        <option value="EMPRESA_EDICAO">EMPRESA_EDICAO</option>
                    </select>
                </div>

                <!-- Botão de cadastro -->
                <button type="submit" class="btn btn-primary w-100">
                    Cadastrar
                </button>
            </form>
        </div>

        <!-- Modal de sucesso -->
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="successModalLabel">Sucesso</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Cadastro realizado com sucesso!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="redirecionarLogin">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import usuarioService from '@/services/usuarioService';

export default {
    name: 'CadastroUsuarioView',
    data() {
        return {
            nomeCompleto: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            permissao: '',
            errorMessage: ''
        };
    },
    methods: {
        async cadastrarUsuario() {
            if (this.senha !== this.confirmarSenha) {
                this.errorMessage = 'As senhas não conferem.';
                return;
            }

            try {
                await usuarioService.cadastrarUsuario({
                    nome: this.nomeCompleto,
                    email: this.email,
                    senha: this.senha,
                    permissao: this.permissao
                });

                this.errorMessage = '';
                this.$nextTick(() => {
                    const modalElement = document.getElementById('successModal');
                    if (modalElement) {
                        const bootstrapModal = new window.bootstrap.Modal(modalElement);
                        bootstrapModal.show();
                    }
                });
            } catch (error) {
                this.errorMessage = error.message || 'Erro ao cadastrar usuário.';
            }
        },
        redirecionarLogin() {
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.cadastro-usuario-page {
    min-height: 100vh;
    flex-direction: column;
    background: linear-gradient(135deg, #0abac7 0%, #0b86c7 100%);
    padding: 20px;
    box-sizing: border-box;
}

/* Card central */
.cadastro-card {
    width: 500px;
    border-radius: 8px;
    background-color: #fff;
}

.cadastro-card .form-control:focus {
    box-shadow: none;
    border-color: #0d6efd;
}
</style>