<template>
  <div>
    <div class="resultKey">{{resultKey}}</div>
  </div>
</template> 

<script>
import { mapGetters } from "vuex";

export default {
  name: "query-item",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters("FilterQuerys", []),
  },
};
</script>

<style scoped lang="scss">
.query-item {
}
</style>
