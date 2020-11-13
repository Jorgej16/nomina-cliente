<template>
  <div class="dropdown">
    <q-expansion-item :icon="icon" :label="title">
      <Item v-for="(item, key) in group" :key="key" v-bind="item" :dropdownItem="true" />
    </q-expansion-item>
  </div>
</template>

<script>
import Item from "./Item";

export default {
  name: "DropdownMenu",
  components: {
    Item
  },
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: "#"
    },
    icon: {
      type: String,
      default: ""
    },
    group: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.dropdown .q-item {
  padding-left: 20px;
}
</style>
