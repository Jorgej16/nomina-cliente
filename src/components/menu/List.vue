<template>
  <div class="menu-list">
    <component :is="currentComponent" v-bind="item"></component>
  </div>
</template>

<script>
import Item from "./Item";
import DropDown from "./Dropdown";
export default {
  name: "ListMenu",
  components: {
    Item,
    DropDown
  },
  props: {
    item: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      currentComponent: "Item"
    };
  },
  created() {
    if ("group" in this.item) {
      this.currentComponent = "DropDown";
    } else {
      this.currentComponent = "Item";
    }
  }
};
</script>

