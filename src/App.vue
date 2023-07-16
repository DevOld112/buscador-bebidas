<script setup>

import { RouterView  } from 'vue-router';
import Header from './components/Header.vue'
import Modal from './components/Modal.vue';
import Notificacion from './components/Notificacion.vue';

</script>

<template>
    <Header />

    <main class="container mx-auto mt-10 p-5">
      <RouterView />
    </main>

    <Modal
     />
    <Notificacion
    />

</template>

