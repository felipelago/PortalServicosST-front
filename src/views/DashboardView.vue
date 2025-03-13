<template>
  <div class="dashboard-page">
    <!-- NAVBAR SUPERIOR -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-transparent" >
      <div class="container-fluid">
        <!-- Itens do menu -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- Link simples -->
            <li class="nav-item">
              <router-link class="nav-link" to="/cadastro-empresa">
                Cadastro de Empresa
              </router-link>
            </li>

            <!-- Dropdown: Administração de Empresas -->
            <li
              class="nav-item dropdown"
              @mouseover="showSubmenu = true"
              @mouseleave="showSubmenu = false"
            >
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Administração de Empresas
              </a>
              <ul class="dropdown-menu" :class="{ show: showSubmenu }">
                <li>
                  <router-link class="dropdown-item" to="/administracao-empresas">
                    Empresas
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
          <!-- Botão de Logout -->
          <button class="btn btn-outline-light" @click="logout">Logout</button>
        </div>
      </div>
    </nav>

    <!-- CONTEÚDO PRINCIPAL: Carrossel central -->
    <main class="d-flex align-items-center justify-content-center p-4" style="min-height: calc(100vh - 56px);">
      <!-- Card com o Carrossel -->
      <div class="card shadow p-3" style="width: 800px; border-radius: 8px;">
        <div id="portoCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#portoCarousel" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#portoCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../../public/images/porto1.webp" class="d-block w-100" alt="Porto 1" />
            </div>
            <div class="carousel-item">
              <img src="../../public/images/porto2.webp" class="d-block w-100" alt="Porto 2" />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#portoCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#portoCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Próximo</span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      showSubmenu: false,
    };
  },

  methods: {
  logout() {
    localStorage.removeItem('usuarioLogado');
    this.$router.push('/login');
  }
}
};
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0abac7 0%, #0b86c7 100%);
}
</style>
