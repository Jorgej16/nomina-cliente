<template>
  <div>
    <q-card class="card">
      <q-card-section>
        <TransaccionesCreate />
      </q-card-section>
    </q-card>
    <q-card class="card">
        <TransaccionesList />
    </q-card>
  </div>
</template>

<script>    
import TransaccionesList from "./gestion/TransaccionesList";
import TransaccionesCreate from "./gestion/TransaccionesCreate";
export default {
  components: {
    TransaccionesList,
    TransaccionesCreate
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
