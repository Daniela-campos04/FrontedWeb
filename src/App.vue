<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MainNavbar from './components/MainNavbar.vue'
import LoginView from './views/LoginView.vue' // Asegúrate de importar el LoginView aquí arriba si no estaba

const router = useRouter()
const usuarioAutenticado = ref(null) 

// COMENTA O BORRA temporalmente la función que busca a Flask
/*
async function verificarSesion() {
  ...
}
*/

function manejarLoginExitoso(usuario) {
  usuarioAutenticado.value = usuario
  router.push('/') 
}

async function cerrarSesion() {
  // Simulamos el cierre de sesión sin llamar a Flask
  usuarioAutenticado.value = null
  router.push('/login')
}

onMounted(() => {
  // SIMULACIÓN: En lugar de llamar a Flask, obligamos a que cargue el Login local
  // Si quieres entrar directo sin loguearte para probar, puedes cambiar null por 'Test' arriba
  if (!usuarioAutenticado.value) {
    router.push('/login')
  }
})
</script>

<template>
  <div class="contenedor">
    <template v-if="usuarioAutenticado">
      <MainNavbar :usuario="usuarioAutenticado" @logout="cerrarSesion" />
      <RouterView />
    </template>
    
    <template v-else>
      <LoginView @login-exitoso="manejarLoginExitoso" />
    </template>
  </div>
</template>

<style scoped>
.contenedor {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}
</style>