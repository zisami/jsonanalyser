<template>
    <section
        class="query-list-tool-bar border-opacity-20 border-gray-100 border-b flex py-1 px-2 select-none"
    >
        <div class="buttons-allways flex content-center mr-4">
            <button
                @click="add({ query: {}, list: config.listKey })"
                class="btn"
            >
                <span class="material-icons"> note_add </span>
            </button>
        </div>
        <div
            class="buttons-selected hidden"
            :class="{ 'display-buttons-selected': selected(config.listKey).id }"
        >
            <button @click="editSelected({ list: config.listKey })" class="btn">
                <span class="material-icons icon"> settings </span>
            </button>
            <button @click="exportSelectedQuery(config.listKey)" class="btn">
                <span class="material-icons icon"> get_app </span>
            </button>
            <button
                @click="removeSelected({ list: config.listKey })"
                class="btn"
            >
                <span class="material-icons"> delete </span>
            </button>
        </div>
        <div class="buttons-list-actions ml-auto flex">
            <button
                @click="exportList('liveQuerys')"
                class="btn"
                title="run all querys in list"
            >
                <span class="material-icons"> save_alt </span>
            </button>
            <button
                @click="listResults()"
                class="btn"
                title="run all querys in list"
            >
                <span class="material-icons"> playlist_play </span>
            </button>
            <button
                @dblclick="removeAll('liveQuerys')"
                class="btn"
                title="double click to clear list"
            >
                <span class="material-icons"> delete_sweep </span>
            </button>
        </div>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
//import QueryItem from './QueryItem';
import { mapActions } from "vuex";

export default {
    name: "query-list-tool-bar",
    props: ["config"],
    mounted() {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters("FilterQuerys", ["allQuerys", "selected", "result"]),
    },
    methods: {
        ...mapActions("FilterQuerys", [
            "add",
            "remove",
            "removeSelected",
            "unselect",
            "select",
            "setInputData",
            "listResults",
            "editSelected",
            "removeAll",
            "exportList",
            "exportSelectedQuery",
        ]),
    },

    components: {},
};
</script>

<style scoped lang='postcss'>
.query-list-tool-bar {
}
.display-buttons-selected {
    display: flex;
}
.btn {
    @apply opacity-50 m-0;
}
.btn > .material-icons {
    @apply text-xl;
}
</style>
