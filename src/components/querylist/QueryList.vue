<template>
  <section class="query-list">
    <h1>{{ allQuerys }}</h1>
    <button></button>
    <query-item
      v-for="(item, index) in allQuerys"
      v-bind:item="item"
      v-bind:index="index"
      v-bind:key="item.id"
    >
    </query-item>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import QueryItem from "./QueryItem";

export default {
  name: "query-list",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("FilterQuerys", ["allQuerys", "selected"]),
  },
  methods: {
    add(_query) {
      this.$store.FilterQuerys.dispatch("add", _query);
    },
  },

  components: {
    QueryItem,
  },
};
</script>

<style scoped lang="scss">
.query-list {
}
</style>
