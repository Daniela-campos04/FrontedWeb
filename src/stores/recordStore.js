import { defineStore } from "pinia";
import { ref, computed } from "vue";

const URL_BACKEND = "https://proyectoweb-mgrx.onrender.com"

export const useRecordsStore = defineStore('registros', () => {
    const pacientes = ref([]);
    const citas = ref([]);
    const usuario = ref(null);
    const mensaje = ref("");
    const error = ref("");
    const cargando = ref(false);
    const totalPacientes = computed(() => pacientes.value.length);
    const totalCitas = computed(() => citas.value.length);
    const citasPendientes = computed(() => {

        return citas.value.filter(
            cita => cita.estado === 'Pendiente'
        ).length
    });

    async function iniciarSesion(credenciales) {
        mensaje.value = "";
        error.value = "";

        try {
            const respuesta = await fetch(
                `${URL_BACKEND}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(credenciales)
                }
            );

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    resultado.mensaje ||
                    "Error al iniciar sesión"
                );

            }
            usuario.value = resultado.usuario;
            mensaje.value = resultado.mensaje;
        }

        catch (err) {
            error.value = err.message;
        }
    }

    async function cargarPacientes() {
        cargando.value = true;
        error.value = "";

        try {
            const respuesta = await fetch(
                `${URL_BACKEND}/pacientes`
            );
            const datos = await respuesta.json();
            pacientes.value = datos;
        }

        catch (err) {
            error.value = err.message;
        }

        finally {
            cargando.value = false;
        }
    }

    async function agregarPaciente(nuevoPaciente) {
        mensaje.value = "";
        error.value = "";

        try {
            const respuesta = await fetch(
                `${URL_BACKEND}/pacientes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevoPaciente)
                }
            );

            const resultado = await respuesta.json();
            if (!respuesta.ok) {
                throw new Error(
                    resultado.error ||
                    "No se pudo agregar paciente"
                );
            }
            mensaje.value = resultado.mensaje;
            await cargarPacientes();
        }
        catch (err) {
            error.value = err.message;
        }
    }

    async function cargarCitas() {
        cargando.value = true;
        error.value = "";

        try {
            const respuesta = await fetch(

                `${URL_BACKEND}/citas`

            );
            const datos = await respuesta.json();
            citas.value = datos;
        }

        catch (err) {
            error.value = err.message;
        }
        finally {
            cargando.value = false;
        }
    }

    async function agregarCita(nuevaCita) {
        mensaje.value = "";
        error.value = "";
        try {
            const respuesta = await fetch(
                `${URL_BACKEND}/citas`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevaCita)
                }
            );
            const resultado = await respuesta.json();
            if (!respuesta.ok) {
                throw new Error(
                    resultado.error ||
                    "No se pudo agregar cita"
                );
            }
            mensaje.value = resultado.mensaje;
            await cargarCitas();
        }
        catch (err) {
            error.value = err.message;
        }
    }
    async function actualizarEstado(id, estado) {
        try {
            await fetch(
                `${URL_BACKEND}/citas/actualizar-estado`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id,
                        estado
                    })
                }
            );
            await cargarCitas();
        }
        catch (err) {
            error.value = err.message;
        }
    }

    async function eliminarCita(id) {
        try {
            await fetch(
                `${URL_BACKEND}/citas/eliminar`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id })
                }
            );
            await cargarCitas();
        }
        catch (err) {
            error.value = err.message;
        }
    }

    return {
        pacientes,
        citas,
        usuario,
        mensaje,
        error,
        cargando,
        totalPacientes,
        totalCitas,
        citasPendientes,
        iniciarSesion,
        cargarPacientes,
        agregarPaciente,
        cargarCitas,
        agregarCita,
        actualizarEstado,
        eliminarCita
    }
})
