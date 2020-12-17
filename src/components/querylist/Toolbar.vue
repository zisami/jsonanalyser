<template>
    <section
        class="query-list-tool-bar bg-yellow-500 flex py-1 px-2 my-2 overflow-hidden"
    > {{listName}}
        <div class="buttons-allways flex mr-4">
            <button @click="add({query:{},list:listName})" class="btn">
                <span class="material-icons"> note_add </span>
            </button>
        </div>
        <div
            class="buttons-selected hidden"
            :class="{ 'display-buttons-selected': selected.id }"
        >
            <button @click="editSelected()" class="btn">
                <span class="material-icons"> settings </span>
            </button>
            <button @click="removeSelected()" class="btn">
                <span class="material-icons"> delete </span>
            </button>
        </div>
        <div class="buttons-list-actions ml-auto flex">
            <button @click="listResults()" class="btn">
                <span class="material-icons"> playlist_play </span>
            </button>
            <button @click="removeAll()" class="btn">
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
    props: ['listName'],
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
        ...mapActions("FilterQuerys", [
            "add",
            "remove",
            "removeSelected",
            "unselect",
            "select",
            "setInputData",
            "listResults",
        ]),
    },

    components: {},
};
</script>

<style scoped lang='scss'>
.query-list-tool-bar {
    .display-buttons-selected {
        display: flex;
    }
}
</style>
