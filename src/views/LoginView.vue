<template>
  <div class="login-container">
    <div class="login-card">
      <h2>✨ Bella Piel ✨</h2>
      <h3>Iniciar Sesión</h3>
      
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

      <input 
        type="text" 
        placeholder="Nombre de usuario" 
        v-model="credenciales.usuario"
      >
      
      <input 
        type="password" 
        placeholder="Contraseña" 
        v-model="credenciales.password"
      >

      <button @click="iniciarSesion">Ingresar al Sistema</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['login-exitoso'])

const credenciales = reactive({
  usuario: '',
  password: ''
})

const errorMsg = ref('')

async function iniciarSesion() {
  if (!credenciales.usuario || !credenciales.password) {
    errorMsg.value = 'Todos los campos son obligatorios'
    return
  }

  try {
    const respuesta = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credenciales)
    })

    if (!respuesta.ok) {
      const datosError = await respuesta.json()
      errorMsg.value = datosError.mensaje || 'Credenciales incorrectas'
      return
    }

    const data = await respuesta.json()
    if (data.success) {
      alert('¡Bienvenido al sistema de Bella Piel!')
      emit('login-exitoso', data.usuario)
    }

  } catch (error) {
    console.error("Detalles del error de red:", error)
    errorMsg.value = 'Error al conectar con el servidor backend'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
.login-card {
  background: white;
  border: 2px solid #f7d6e0;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  text-align: center;
  width: 100%;
  max-width: 350px;
}
h2 { color: #c06c84; margin-bottom: 5px; }
h3 { color: #6c5b7b; margin-bottom: 20px; }
input {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
button {
  background: #c06c84;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  font-weight: bold;
}
.error {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>