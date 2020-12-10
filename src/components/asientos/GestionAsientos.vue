<template>
  <div>
        <AsientosList />
  </div>
</template>

<script>    
import AsientosList from "./gestion/AsientosList";
export default {
  components: {
    AsientosList,
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
