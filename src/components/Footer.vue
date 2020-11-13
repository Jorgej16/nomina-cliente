<template>
  <div class="footer">Copyright © {{year}} NOMINA | INTEGRACION DE APLICACIONES OPEN SOURSE \ PROPIETARIA</div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      year: null
    };
  },
  created() {
    this.year = new Date().getFullYear();
  }
};
</script>
<style scoped>
.footer {
    position: fixed;
    padding: 20px;
    bottom: 0;
    width: 100%;
  color: #6e768e;
  background-color: #ecf1f3;
}
</style>
