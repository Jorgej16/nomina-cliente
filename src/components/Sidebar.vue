<template>
  <q-drawer show-if-above v-model="isOpened" content-class="bg-grey-1">
    <div class="brand flex flex-center">
      <span class="standard">
        
        <b>NOMINA</b>
      </span>
    </div>
    <ListMenu v-for="(item, key) in menuList" :key="key" :item="item" />
  </q-drawer>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import ListMenu from "components/menu/List";
export default {
  name: "Sidebar",
  components: {
    ListMenu
  },
  data() {
    return {
      menuList: [
        {
          title: "Dashboard",
          icon: "dashboard"
        },
        {
          title: "Empleados",
          to:"Empleados",
          icon: "supervisor_account"
        },
        {
          title: "Tipos de Ingreso",
          to:"Ingreso",
          icon: "ballot"
        },
        {
          title: "Tipos de Deducciones",
          to:"Deducciones",
          icon: "ballot"
        },
        {
          title: "Registro de Transacciones",
          to:"Transacciones",
          icon: "ballot"
        },
        {
          title: "Asientos Contables",
          to:"Asientos",
          icon: "ballot"
        },
      ]
    };
  },
  computed: {
    isOpened: function() {
      return this.$store.getters["drawer/isOpened"];
    }
  }
};
</script>
<style scoped>
.logo,
.brand {
  height: 70px;
  width: 100%;
}
.logo span {
  color: #0a396c;
  font-weight: 700;
  font-size: 22px;
  text-transform: uppercase;
}
.brand span {
  color: #0a396c;
  font-size: 22px;
  text-transform: uppercase;
}
.brand .mini {
  display: none;
}
.q-drawer--mini .standard {
  display: none;
}
.q-drawer--mini .brand .mini {
  display: flex;
}
.q-drawer--mini .logo {
  width: auto;
  height: 70px;
}
.q-drawer--mini .logo span {
  display: none;
}
.standard .q-item {
  color: #0a396c;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5 !important;
}
</style>
