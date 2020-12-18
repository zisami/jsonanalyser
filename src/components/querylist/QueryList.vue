<template>
    <section
        class="query-list bg-purple-500 flex flex-col flex-grow p-2 my-4 overflow-hidden"
    >
        <div class="title">{{ config.title }}</div>
        <ToolBar v-bind="$props"> </ToolBar>
        <div
            class="flex flex-col flex-grow overflow-y-scroll p-2 bg-pink-900 select-none"
            v-on:click="clickOutside($event)"
        >
            <div
                v-for="(item, index) in getQueryList(config.listKey)"
                v-bind:key="index"
                class="query-item flex mb-1 border-b border-gray-700 space-x-4"
                :class="{ selected: selected(config.listKey).id === item.id }"
                v-on:click="select({ query: item, list: config.listKey })"
            >
                <div class="key">{{ item.id }}</div>
                <div class="key">{{ item.resultKey }}</div>
                <div class="">=</div>
                <div class="result">
                    {{ result({ query: item, list: config.listKey }) }}
                </div>
            </div>
        </div>
        <div class="bg-indigo-900 p-4">{{ selected.id }}</div>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import ToolBar from "./Toolbar";

export default {
    name: "query-list",
    props: ["config"],
    mounted() {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters("FilterQuerys", [
            "allQuerys",
            "getQueryList",
            "selected",
            "result",
            "inputData",
        ]),
    },
    methods: {
        clickOutside(_event) {
            console.log(_event);
            const isOutside = !_event.target.closest(".query-item");
            if (isOutside) {
                this.unselect({list: this.config.listKey});
            }
        },
        ...mapActions("FilterQuerys", [
            "add",
            "remove",
            "unselect",
            "select",
            "setInputData",
        ]),
    },

    components: { ToolBar },
};
</script>

<style scoped lang='scss'>
.query-list {
    .selected {
        @apply ring;
    }
}
</style>
