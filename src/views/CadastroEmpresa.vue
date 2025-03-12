<template>
    <div class="container mt-4">
        <h2>Cadastro de Empresa</h2>

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
            <button type="submit" class="btn btn-primary">Cadastrar</button>
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
            <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>

        <!-- Formulário para Pessoa Estrangeira -->
        <form v-if="tipoPessoa === 'ESTRANGEIRA'" @submit.prevent="submitEmpresaEstrangeira">
            <h4>Pessoa Estrangeira</h4>
            <div class="mb-3">
                <label class="form-label">Nome</label>
                <input type="text" class="form-control" v-model="empresaEstrangeira.nome" required />
            </div>
            <div class="mb-3">
                <label class="form-label">Identificador Estrangeiro</label>
                <input type="text" class="form-control" v-model="empresaEstrangeira.identificadorEstrangeiro"
                    required />
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
            <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>
    </div>

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
        usuarioResponsavelId: null
      },

      empresaFisica: {
        nome: '',
        cpf: '',
        perfil: '',
        usuarioResponsavelId: null
      }
    };
  },

  methods: {
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

      this.empresaJuridica.usuarioResponsavelId = this.usuarioLogado?.id;

      try {
        await empresaService.cadastrarEmpresaJuridica(this.empresaJuridica);
        alert('Empresa Jurídica cadastrada com sucesso!');
      } catch (error) {
        alert('Erro ao cadastrar empresa jurídica.');
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

      this.empresaFisica.usuarioResponsavelId = this.usuarioLogado?.id;

      try {
        await empresaService.cadastrarEmpresaFisica(this.empresaFisica);
        alert('Empresa Física cadastrada com sucesso!');
      } catch (error) {
        alert('Erro ao cadastrar empresa física.');
      }
    }
  }
};
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>