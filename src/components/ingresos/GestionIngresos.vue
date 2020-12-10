<template>
  <div>
    <q-card class="card">
      <q-card-section>
        <IngresosCreate />
      </q-card-section>
    </q-card>
        <IngresosList />
  </div>
</template>

<script>    
import IngresosList from "./gestion/IngresosList";
import IngresosCreate from "./gestion/IngresosCreate";
export default {
  components: {
    IngresosList,
    IngresosCreate
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.q-btn {
  margin: 10px 5px 0px 0px;
}
.card {
  max-width: 100%;
  margin: 20px 25px;
}
</style>
