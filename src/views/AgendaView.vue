<script setup>

import { onMounted } from 'vue'
import AppointmentCard from '../components/AppointmentCard.vue'
import { useRecordsStore } from '../stores/recordStore'

const store = useRecordsStore()
onMounted(() => {
  store.cargarCitas()
})

async function cambiarEstadoCita(idCita, nuevoEstado) {
  await store.actualizarEstado(idCita,nuevoEstado)}

async function eliminarCita(idCita) {
  if(!confirm('¿Segura que deseas eliminar esta cita?')) return
  await store.eliminarCita(idCita)
}
</script>

<template>
  <div>
    <h1>Agenda de Citas Bella Piel</h1>
    <p v-if="store.citas.length === 0">
      No hay citas registradas en la agenda
    </p>

    <AppointmentCard
      v-for="item in store.citas"
      :key="item.id"
      :id="item.id"
      :paciente="item.paciente"
      :telefono="item.telefono"
      :area="item.area"
      :fecha="item.fecha"
      :hora="item.hora"
      :estado="item.estado"
      @eliminar="eliminarCita(item.id)"
      @cambiar-estado="
        (nuevoEstado) =>
        cambiarEstadoCita(
          item.id,
          nuevoEstado
        )
      "
    />
  </div>
</template>