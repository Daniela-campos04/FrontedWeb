<script setup>
defineProps({
  usuario: String
})
const emit = defineEmits(['logout'])
</script>

<template>
  <nav class="navbar">
    <div class="brand">
      <h2>BELLA PIEL DEPILACION LASER DIODO🌷</h2>
      <span class="user-tag">👤 Admin: {{ usuario }}</span>
    </div>

    <div class="links">
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/pacientes">Pacientes</RouterLink>
      <RouterLink to="/agenda">Agenda</RouterLink>
      <RouterLink to="/agendar">Agendar Cita</RouterLink>
      <button class="btn-logout" @click="emit('logout')">Salir</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f7d6e0;
  border-radius: 15px;
  margin-bottom: 20px;
}
.brand {
  display: flex;
  flex-direction: column;
}
.user-tag {
  font-size: 12px;
  color: #6c5b7b;
  font-weight: bold;
}
.links {
  display: flex;
  gap: 12px;
  align-items: center;
}
.links a {
  text-decoration: none;
  background: #c06c84;
  color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
}
.links a.router-link-active {
  background: #6c5b7b;
}
.btn-logout {
  background: #6c5b7b;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.btn-logout:hover {
  background: #4a3b5c;
}
</style>