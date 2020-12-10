<template>
  <div>
    <q-card class="card">
      <q-card-section>
        <DeducionesCreate />
      </q-card-section>
    </q-card>
        <DeducionesList />
  </div>
</template>

<script>    
import DeducionesList from "./gestion/DeducionesList";
import DeducionesCreate from "./gestion/DeducionesCreate";
export default {
  components: {
    DeducionesList,
    DeducionesCreate
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
