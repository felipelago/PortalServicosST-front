import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/empresas';

export default {
    cadastrarEmpresaJuridica(empresa) {
        return axios.post(`${API_URL}/cadastrar/juridica`, empresa);
    },

    cadastrarEmpresaFisica(empresa) {
        return axios.post(`${API_URL}/cadastrar/fisica`, empresa);
    },

    cadastrarEmpresaEstrangeira(empresa) {
        return axios.post(`${API_URL}/cadastrar/estrangeira`, empresa);
    },

    listarEmpresas() {
        return axios.get(`${API_URL}/listarTudo`);
    },
};
