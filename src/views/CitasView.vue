<script setup>

import { reactive } from 'vue'

const cita = reactive({
  paciente:'',
  area:'',
  fecha:''
})

function guardarCita(){

  if(
    !cita.paciente ||
    !cita.area ||
    !cita.fecha
  ){
    alert('Todos los campos son obligatorios')
    return
  }

  alert('Cita registrada correctamente')

  cita.paciente = ''
  cita.area = ''
  cita.fecha = ''

}

</script>

<template>

<div>

  <h1>Agendar Cita</h1>

  <input
    v-model="cita.paciente"
    placeholder="Paciente"
  >

  <input
    v-model="cita.area"
    placeholder="Área"
  >

  <input
    v-model="cita.fecha"
    type="date"
  >

  <button @click="guardarCita">

    Guardar

  </button>

</div>

</template>

<style scoped>

input{
  display:block;
  margin-bottom:10px;
  padding:10px;
  width:250px;
}

button{
  background:#c06c84;
  color:white;
  border:none;
  padding:10px;
  border-radius:8px;
}

</style>