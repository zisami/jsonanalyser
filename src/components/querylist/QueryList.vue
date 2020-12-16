<template>
    <section class="query-list">
        <button @click="add()" class="btn">add</button>
        <div v-for="(item, index) in allQuerys" v-bind:key="index" class="flex">
            <div class="key">{{ item.resultKey }}</div>
            <div class="">=</div>
            <div class="result">{{ result(item) }}</div>
        </div>
    </section>
</template>
{{allQuerys}}
<script>
import { mapGetters } from "vuex";
//import QueryItem from "./QueryItem";
import { mapActions } from "vuex";

export default {
    name: "query-list",
    props: [],
    mounted() {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters("FilterQuerys", [
            "allQuerys",
            "selected",
            "result",
            "inputData",
        ]),
    },
    methods: {
        ...mapActions("FilterQuerys", ["add", "setInputData"]),
    },

    components: {},
};
</script>

<style scoped lang="scss">
.query-list {
}
</style>
