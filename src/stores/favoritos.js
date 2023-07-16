import { ref, watch, onMounted } from 'vue'
import { defineStore } from 'pinia';
import {useBebidasStore } from './bebidas'
import { useModalStore } from './modal';
import { useNotificacionStore } from './notificaciones';




export const useFavoritosStore = defineStore('favoritos', () =>{

    const bebidas = useBebidasStore();
    const favoritos = ref([])
    const modal = useModalStore()
    const notificaciones = useNotificacionStore()

    onMounted(() =>{
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })

    watch(favoritos, () => {
        sincronizarLocalStorage()
    }, {
        deep: true
    })

    const sincronizarLocalStorage = () =>{
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }

    const existeFavorito = (id) => {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []

        return favoritosLocalStorage.some(favorito => favorito.idDrink === id)
    }

    const eliminarFavoritos = () => {
        favoritos.value = favoritos.value.filter(favoritos => favoritos.idDrink !== bebidas.receta.idDrink)

        notificaciones.mostrar = true
        notificaciones.texto = 'Se Ha Eliminado De Favoritos'
        
        setTimeout(() =>{
            notificaciones.$reset()
        }, 3000)
    }

    const agregarFavoritos = () => {
        favoritos.value.push(bebidas.receta)

        notificaciones.mostrar = true
        notificaciones.texto = 'Se Agregado a Favoritos'
        
        setTimeout(() =>{
            notificaciones.$reset()
        }, 3000)
    }

    const handleClickFavorito = () =>{
        if(existeFavorito(bebidas.receta.idDrink)){
            eliminarFavoritos()
            
        } else {
            agregarFavoritos()
            
        }

        modal.modal = false

    }

    return {
        handleClickFavorito,
        favoritos,
        existeFavorito
    }

})