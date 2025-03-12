<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label>Email:</label>
                <input type="email" v-model="email" required />
            </div>
            <div>
                <label>Senha:</label>
                <input type="password" v-model="senha" required />
            </div>
            <button type="submit">Entrar</button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import authService from '@/services/authService';

export default {
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

                alert("Login feito com sucesso");
                this.$router.push('/dashboard');
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
}

.error {
    color: red;
}
</style>