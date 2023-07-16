import { ref }  from 'vue'
import {defineStore } from 'pinia'


export const useNotificacionStore = defineStore('notificacion', () => {

    const texto = ref('');
    const error = ref(false);
    const mostrar = ref(false);

    function $reset(){
        texto.value = ''
        error.value = false
        mostrar.value = false
    }

    return {
        texto,
        error,
        mostrar,
        $reset
    }
})