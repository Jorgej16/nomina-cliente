<template>
  <div>
    <q-card class="card">
      <q-card-section>
        <EmpleadosCreate />
      </q-card-section>
    </q-card>
    <q-card class="card">
        <EmpleadosList />
    </q-card>
  </div>
</template>

<script>    
import EmpleadosList from "./gestion/EmpleadosList";
import EmpleadosCreate from "./gestion/EmpleadosCreate";
export default {
  components: {
    EmpleadosList,
    EmpleadosCreate
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
