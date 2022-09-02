
<template>
  <div
    v-show="showSavedQuerys"
    class="inset-0 absolute bg-pink-700 bg-opacity-90 flex justify-center items-center z-10"
  >
    <div class="bg-gray-800 w-full h-full flex flex-col justify-between">
      <query-list
        :config="configAllQuerys"
        class=" flex-grow"
      />
      <div class="flex-grow-0 flex flex-row items-end px-4">
        <!-- #################### FORM BUTTONS #################### -->
        <button
          class="flex items-center flex-grow-0 mr-8 py-2 px-4 ml-auto capitalize tracking-wide bg-green-600 text-gray-800 font-medium rounded focus:outline-none"
          @click="toggleSavedQuerys()"
        >
          <span class="mx-1">Fertig</span>
        </button>
        <button
          class="flex items-center flex-grow-0 py-2 px-4 capitalize tracking-wide bg-gray-600 text-white font-medium rounded focus:outline-none"
          @click="toggleSavedQuerys()"
        >
          <span class="mx-1">Abbrechen</span>
        </button>
      </div>
      <div class="h-8" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import QueryList from "./QueryList";

export default {
    name: "SavedQueryList",
    props: ["config"],
    data() {
        return {
            configAllQuerys: {
                listTitle: "Alle meine Filter Querys",
                listKey: "allQuerys",
                open: true,
            },
        };
    },
    mounted() {
    },
    computed: {
        ...mapGetters("FilterQuerys", [
            "allQuerys",
            "selected",
            "result",
            "inputData",
            "queryToEdit",
            'showSavedQuerys'
        ]),
    },
    watch: {

    },
    methods: {
        ...mapActions("FilterQuerys", [
            "add",
            "remove",
            "removeSelected",
            "unselect",
            "select",
            "listResults",
            "clearQueryToEdit",
            'toggleSavedQuerys',
        ]),

        ...mapActions("JsonData", ["setInputData", "setOutputData"]),
        /**
         * Speichert die editierte Query
         */
        saveEditedQuery() {
            this.queryToEdit.edit = false;
            this.add({ query: this.queryToEdit });
            this.clearQueryToEdit();
        },
        /**
         * Updated den Ergebnnis Editor
         */
        updateResult() {
            this.outputEditor.outputData = this.result({
                query: this.queryToEdit,
            });
        },
        /**
         * Bei Code änderung in Prism Editor den Code ausführen und in Ergebniseditor
         * @param {String} _code //Code aus dem Editor, nicht verwendeet
         */
        onCodeChange() {
            this.updateResult();
        },
    },
    components: {
        "query-list": QueryList,
    },
    $el: "root",
};
</script>

<style scoped lang='postcss'>
</style>
