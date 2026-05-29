<script setup>
const props = defineProps({
  id: Number, // Agregamos ID para identificar la cita en base de datos
  paciente: String,
  telefono: String,
  area: String,
  fecha: String,
  hora: String,
  estado: String,
  favorito: Boolean
})

const emit = defineEmits(['eliminar', 'cambiar-estado'])

const estados = ['Pendiente', 'Llegó', 'Atendida', 'Suspendida']

function actualizarEstado(event) {
  emit('cambiar-estado', event.target.value)
}
</script>

<template>
  <div :class="['card', { favorito: favorito }]">
    <h2>{{ paciente }}</h2>
    <p><b>Teléfono:</b> {{ telefono }}</p>
    <p><b>Área:</b> {{ area }}</p>
    <p><b>Fecha:</b> {{ fecha }}</p>
    <p><b>Hora:</b> {{ hora }}</p>
    <p><b>Estado:</b></p>
    
    <select :value="estado" @change="actualizarEstado">
      <option v-for="item in estados" :key="item" :value="item">
        {{ item }}
      </option>
    </select>

    <button @click="emit('eliminar')">Eliminar Cita</button>
  </div>
</template>

<style scoped>
/* Tus estilos se quedan exactamente igual */
.card { background: white; border: 2px solid #f7d6e0; padding: 15px; margin-bottom: 15px; border-radius: 14px; }
.favorito { border-color: #c06c84; }
button { margin-top: 10px; padding: 8px; border: none; border-radius: 8px; background: #c06c84; color: white; cursor: pointer; }
select { display: block; margin-bottom: 10px; padding: 8px; border-radius: 8px; border: 1px solid #ccc; }
</style>