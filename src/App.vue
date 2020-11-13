<template>
  <div id="q-app"> 
    <q-layout view="lHh Lpr lFf">
      <router-view :empleado="empleado" name="header" />
      <router-view name="sidebar" />
      <q-page-container>
        <router-view />
        <router-view name="footer" />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      empleado: {
        nombre: "JORGE HERRERA",
        cedula: "123"
      }
    }
  }
}
</script>
