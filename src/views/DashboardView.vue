<template>
  <div class="dashboard-container">
    <aside class="sidebar">
      <ul>
        <li><router-link to="/cadastro-empresa">Cadastro de Empresa</router-link></li>
        <li @mouseover="showSubmenu = true" @mouseleave="showSubmenu = false">
          Administração de Empresas
          <ul v-if="showSubmenu" class="submenu">
            <li><router-link to="/administracao-empresas">Empresas</router-link></li>
          </ul>
        </li>
      </ul>
    </aside>

    <main class="content">
      <h1>Bem-vindo ao Dashboard</h1>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSubmenu: false,
    };
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 10px;
  cursor: pointer;
}

.sidebar ul li:hover {
  background-color: #34495e;
}

.submenu {
  background-color: #1f2d3d;
  margin-top: 5px;
  padding-left: 15px;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
