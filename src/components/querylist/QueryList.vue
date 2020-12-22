<template>
    <section class="query-list flex flex-col px-2 overflow-hidden mb-2">
        <div
            class="flex select-none bg-gray-900 bg-opacity-30 content-center flex-row border-opacity-20 border-gray-100 border-b-2 px-2 py-1 cursor-pointer"
            v-on:click="toggleList()"
        >
            <div class="title">
                {{ config.listTitle }}
            </div>
            <div class="opener-icon ml-auto">
                <span class="material-icons" v-show="open"> expand_less </span>
                <span class="material-icons" v-show="!open"> expand_more </span>
            </div>
        </div>
        <ToolBar v-bind="$props" v-show="open" > </ToolBar>
        <div
            class="list-container border-opacity-10 overflow-hidden h-full"
            v-show="open"
        >
            <div
                class="flex flex-col flex-grow overflow-y-scroll select-none h-full"
                v-on:click="clickOutside($event)"
            >
                <div
                    v-for="(item, index) in getQueryList(config.listKey)"
                    v-bind:key="index"
                    class="query-item flex px-2 border-b w-full border-gray-700"
                    :class="{
                        selected: selected(config.listKey).id === item.id,
                    }"
                    v-on:click="select({ query: item, list: config.listKey })"
                    v-on:dblclick="editSelected({ list: config.listKey })"
                >
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
        ])
    },
    methods: {
        toggleList() {
            this.config.open = !this.config.open;
        },
        clickOutside(_event) {
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
            "editSelected"
        ]),
        
    },

    components: { ToolBar },
};
</script>

<style scoped lang='postcss'>
.query-list {
}
.selected {
    @apply bg-white bg-opacity-10;
}
.query-item:last-child{
    @apply mb-2;
}
</style>
