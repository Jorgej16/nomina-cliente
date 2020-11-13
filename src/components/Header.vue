<template>
  <q-header elevated class="flex flex-center">
    <q-toolbar class="flex justify-between">
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="switchMenu" />
       <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar> -->
          {{saludo}}, {{$attrs.empleado.nombre}}
        </q-toolbar-title>
      <q-btn-dropdown
        flat
        label="NOMINA"
        icon="exit_to_app"
      >
        <q-list>
          <q-item to="login" clickable v-close-popup>
            <q-item-section>
              <q-item-label>Cerrar Sesión</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      hour: null,
      saludo: null
    };
  },
  created() {
    this.saludar();
  },
  methods: {
    saludar() {
      this.hour = new Date().getHours();
      let hourNow = this.hour;
      if (hourNow >= 0 && hourNow < 12) {
        this.saludo = "Buenos Dias"
      }
      if (hourNow >= 12 && hourNow < 18) {
        this.saludo = "Buenas Tardes"
      }
      if (hourNow >= 18 && hourNow < 24) {
        this.saludo = "Buenas Noches"
    }
    },
    switchMenu() {
      this.$store.dispatch("drawer/switchMenu");
    }
  }
};
</script>
<style scoped>
.q-header {
  height: 70px;
  background-color: #0a396c;
  color: #adb5bd;
}
</style>
