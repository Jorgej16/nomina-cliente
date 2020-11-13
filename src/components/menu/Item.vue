<template>
  <div class="item">
    <q-item clickable :to="to != null ? {name: to} : '/'" :class="[(dropdownItem) ? 'pleft' : '']">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "ItemMenu",
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: "#"
    },
    to: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: ""
    },
    dropdownItem: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style>
.q-item {
  color: #6e768e !important;
  display: flex;
  padding: 13px 20px;
  position: relative;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  font-size: 15.5px;
}
.pleft {
  padding-left: 50px;
}
</style>
