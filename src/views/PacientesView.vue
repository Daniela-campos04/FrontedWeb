<script setup>

import { reactive, onMounted } from 'vue'
import { useRecordsStore } from '../stores/recordStore'

const store = useRecordsStore()

const nuevaPaciente = reactive({
  nombre: '',
  telefono: '',
  correo: ''
})

onMounted(() => {
  store.cargarPacientes()
})

async function agregarPaciente() {
 if (
  !nuevaPaciente.nombre ||
  !nuevaPaciente.telefono ||
  !nuevaPaciente.correo
) {

    alert('Todos los campos son obligatorios')
    return
  }

  await store.agregarPaciente({
  nombre: nuevaPaciente.nombre,
  telefono: nuevaPaciente.telefono,
  correo: nuevaPaciente.correo
})

  alert('Paciente agregada correctamente')
  nuevaPaciente.nombre = ''
  nuevaPaciente.telefono = ''
  nuevaPaciente.correo = ''
}
</script>

<template>
  <div>
    <h1>Pacientes Bella Piel</h1>
    <div class="form-container">
      <input
        type="text"
        placeholder="Nombre completo"
        v-model="nuevaPaciente.nombre"
      >

      <input
        type="text"
        placeholder="Teléfono"
        v-model="nuevaPaciente.telefono"
      >

      <input
        type="email"
        placeholder="Correo electrónico"
        v-model="nuevaPaciente.correo"
      >

      <button @click="agregarPaciente">
        Agregar Paciente
      </button>
    </div>

    <h2>Listado de Pacientes</h2>
    <div
      v-for="(item, index) in store.pacientes"
      :key="index"
      class="card"
    >
      <h3>{{ item.nombre }}</h3>
      <p>
        <b>Teléfono:</b>
        {{ item.telefono }}
      </p>
      <p>
        <b>Correo:</b>
        {{ item.correo }}
      </p>
    </div>
  </div>
</template>

<style scoped>
input {
  display: block;
  width: 250px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

button {
  background: #c06c84;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
}

.card {
  background: white;
  border: 2px solid #f7d6e0;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 12px;
}
</style>