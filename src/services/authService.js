import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export default {
  async login(email, senha) {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Erro ao fazer login");
    }
  }
};
