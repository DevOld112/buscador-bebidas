import { ref, onMounted, reactive, computed } from "vue";
import { defineStore } from "pinia";
import APIservices from "../services/APIservices";
import { useModalStore } from "./modal";





export const useBebidasStore = defineStore('bebidas', () => {

    const modal = useModalStore()
    const categorias = ref([])
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    })

    const recetas = ref([])
    const receta = ref({})

    onMounted(async function() {
        const {data: {drinks}} = await APIservices.obtenerCategorias()
        categorias.value = drinks
    })

    async function obtenerRecetas() {
        const {data: {drinks}} = await APIservices.buscarRecetas(busqueda)
        recetas.value = drinks

    }

    async function seleccionarBebida(id){
        const {data: {drinks}} = await APIservices.buscarReceta(id)
        receta.value = drinks[0]
        modal.handleClickModal()
    }

    const noRecetas = computed(() => recetas.value.length === 0)

    



    return {
        categorias,
        busqueda,
        obtenerRecetas,
        recetas,
        seleccionarBebida,
        receta,
        noRecetas
    }

})