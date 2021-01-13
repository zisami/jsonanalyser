<template>
    <section class="query-list flex flex-col px-2 overflow-hidden mb-2">
        <div class="title">
            {{ config.listTitle }} 
            {{
                getQueryList(config.listKey).length
                    ? "(" + getQueryList(config.listKey).length + ")"
                    : ""
            }}
        </div>
        <ToolBar v-bind="$props" v-show="open"> </ToolBar>
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
                        'text-yellow-400': item.type === 'query',
                        'text-purple-400': item.type === 'value',
                    }"
                    v-on:click="select({ query: item, list: config.listKey })"
                    v-on:dblclick="handleDblClick(config.listKey)"
                >
                    <div class="key">{{ item.resultKey }}</div>
                    <div class="description" v-show="item.description">
                        &nbsp;:&nbsp;{{ item.description }}
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
        ]),
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
        handleDblClick(_list) {
            console.log(_list);
            if (_list === "liveQuerys") {
                this.editSelected({ list: this.config.listKey });
            } else if (_list === "allQuerys") {
                this.add({ query: this.selected(_list), list: "liveQuerys" });
            }
        },
        ...mapActions("FilterQuerys", [
            "add",
            "remove",
            "unselect",
            "select",
            "editSelected",
            "removeAll",
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
.query-item:last-child {
    @apply mb-2;
}
</style>
