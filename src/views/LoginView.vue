<template>
    <div class="login-page d-flex align-items-center justify-content-center">
      <!-- Título / Logo -->
      <div class="text-center mb-4">
        <h1 class="mb-0" style="font-weight: 700; font-size: 2.5rem;">
          RIVER <span style="font-weight: 300;">PortHub</span>
        </h1>
      </div>
  
      <!-- Card do formulário de login -->
      <div class="card p-4 shadow login-card">
        <form @submit.prevent="login" class="mb-3">
          <!-- Campo Email -->
          <div class="mb-3">
            <label class="form-label fw-semibold">Email</label>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <i class="bi bi-envelope-fill text-secondary"></i>
              </span>
              <input
                type="email"
                class="form-control border-start-0"
                placeholder="Informe seu email"
                v-model="email"
                required
              />
            </div>
          </div>
  
          <!-- Campo Senha -->
          <div class="mb-3">
            <label class="form-label fw-semibold">Senha</label>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <i class="bi bi-lock-fill text-secondary"></i>
              </span>
              <input
                type="password"
                class="form-control border-start-0"
                placeholder="Informe sua senha"
                v-model="senha"
                required
              />
            </div>
          </div>
  
          <!-- Botão Entrar -->
          <button type="submit" class="btn btn-primary w-100">
            Entrar
          </button>
  
          <!-- Mensagem de erro -->
          <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
        </form>
  
        <!-- Esqueceu sua senha? (Ainda sem funcionalidade)-->
        <div class="text-center">
          <a href="#" class="text-decoration-none text-secondary">
            Esqueceu sua senha?
          </a>
        </div>
  
        <!-- Link para cadastro de usuário -->
        <div class="text-center mt-3">
          <span class="text-secondary">Não possui conta?</span>
          <router-link to="/cadastro-usuario" class="text-decoration-none text-primary fw-semibold ms-1">
            Cadastre-se
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import authService from '@/services/authService';
  
  export default {
    name: 'LoginView',
    data() {
      return {
        email: '',
        senha: '',
        errorMessage: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await authService.login(this.email, this.senha);
          localStorage.setItem('usuarioLogado', JSON.stringify(response));
          this.$router.push('/dashboard');
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    min-height: 100vh;
    flex-direction: column;
    background: linear-gradient(135deg, #0abac7 0%, #0b86c7 100%);
    padding: 20px;
    box-sizing: border-box;
  }
  
  .login-card {
    width: 350px;
    border-radius: 8px;
    background-color: #fff;
  }
  
  .input-group .form-control:focus {
    box-shadow: none;
    border-color: #0d6efd;
  }
  </style>