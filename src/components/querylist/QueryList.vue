<template>
    <section
        class="query-list flex flex-col px-2 overflow-hidden"
    >
        <div class="flex select-none bg-gray-900 bg-opacity-30 content-center flex-row  border-opacity-20 border-gray-100 border-b-2  px-2 py-1 cursor-pointer" v-on:click="toggleList()">
            <div class="title">
                {{ config.listTitle }}
            </div>
            <div class="opener-icon ml-auto">
                <span class="material-icons" v-show="open"> expand_less </span>
                <span class="material-icons" v-show="!open"> expand_more </span>
            </div>
        </div>
        <div class="list-container border-opacity-10 border-gray-100  border" v-show="open">
            <ToolBar v-bind="$props"> </ToolBar>
            <div
                class="flex flex-col flex-grow overflow-y-scroll   select-none"
                v-on:click="clickOutside($event)"
            >
                <div
                    v-for="(item, index) in getQueryList(config.listKey)"
                    v-bind:key="index"
                    class="query-item flex  px-2 border-b border-gray-700 space-x-4"
                    :class="{
                        selected: selected(config.listKey).id === item.id,
                    }"
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
        </div>
    </section>
</template>

<script>
console.log();
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
        open() {
            return this.config.open;
        },
        ...mapGetters("FilterQuerys", [
            "allQuerys",
            "getQueryList",
            "selected",
            "result",
            "inputData",
        ]),
    },
    methods: {
        toggleList() {
            this.config.open = !this.config.open;
            console.log(this.config.open);
        },
        clickOutside(_event) {
            console.log(_event);
            const isOutside = !_event.target.closest(".query-item");
            if (isOutside) {
                this.unselect({ list: this.config.listKey });
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
        @apply bg-white bg-opacity-10;
    }
}
</style>
