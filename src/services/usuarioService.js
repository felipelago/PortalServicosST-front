import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/usuarios';

export default {
    cadastrarUsuario(usuario) {
        return axios.post(`${API_URL}/cadastrar`, usuario);
    }
};
