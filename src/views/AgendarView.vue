<script setup>
import { reactive, onMounted } from 'vue'
import { useRecordsStore } from '../stores/recordStore'

const store = useRecordsStore()
const cita = reactive({
  paciente: '',
  telefono: '',
  area: '',
  fecha: '',
  hora: ''
})

onMounted(() => {
  store.cargarPacientes()
})

async function guardarCita() {
  if (
    !cita.paciente ||
    !cita.area ||
    !cita.fecha ||
    !cita.hora
  ) {

    alert('Todos los campos son obligatorios para la agenda')
    return
  }

  const pacienteSeleccionado = store.pacientes.find(
    item => item.nombre === cita.paciente
  )

  if (pacienteSeleccionado) {
    cita.telefono = pacienteSeleccionado.telefono
  }

  await store.agregarCita({
    paciente: cita.paciente,
    telefono: cita.telefono,
    area: cita.area,
    fecha: cita.fecha,
    hora: cita.hora
  })

  alert('Cita registrada correctamente')
  cita.paciente = ''
  cita.telefono = ''
  cita.area = ''
  cita.fecha = ''
  cita.hora = ''
}
</script>

<template>
  <div>
    <h1>Agendar Cita de Depilación</h1>
    <select v-model="cita.paciente">
      <option disabled value="">
        Selecciona una paciente
      </option>
      <option
        v-for="item in store.pacientes"
        :key="item.nombre"
      >
        {{ item.nombre }}
      </option>
    </select>

    <select v-model="cita.area">
      <option disabled value="">
        Selecciona un área
      </option>
      <option>Axilas</option>
      <option>Piernas</option>
      <option>Bikini</option>
      <option>Rostro</option>
      <option>Brazos</option>
      <option>Espalda</option>
    </select>

    <input
      type="date"
      v-model="cita.fecha"
    >
    <input
      type="time"
      v-model="cita.hora"
    >

    <button @click="guardarCita">
      Guardar Cita en Agenda
    </button>
  </div>
</template>

<style scoped>
input,
select {
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
  cursor: pointer;
}
</style>