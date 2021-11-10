
<template>
  <div
    v-show="queryToEdit"
    class="inset-0 absolute bg-gray-700 bg-opacity-90 flex justify-center items-center z-20"
  >
    <div class="bg-gray-800 flex flex-col justify-between w-full h-full">
      <div class="w-full p-4 flex-none rounded-t-xl font-bold">
        Filter Query Bearbeiten
      </div>
      <div class="flex-grow p-8 flex flex-col">
        <div class="flex flex-wrap my-4 items-center">
          <input
            v-model="queryToEdit.resultKey"
            type="text"
            class="bg-transparent text-gray-400 border-b border-gray-300"
          >
          <div class="text-xs text-gray-500 w-full mt-2">
            Der Key unter dem das Query Ergebniss angezeigt wird.
          </div>
        </div>
        <div class="flex flex-wrap my-4 items-center">
          <input
            v-model="queryToEdit.description"
            type="text"
            class="bg-transparent text-gray-400 border-b border-gray-300"
          >
          <div class="text-xs text-gray-500 w-full mt-2">
            Eine optionale Beschreibung die in den Query Listen
            angezeigt wird.
          </div>
        </div>
        <div class="flex flex-wrap my-4 items-center">
          <div class="mr-4 w-48">
            Query
          </div>
          <div class="text-xs text-gray-300 w-full my-2">
            Schreibe deine Funktion wie du willst, du musst nur
            einen Wert zurück geben. <br>
            Du kannst
            <a
              href="https://lodash.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-400 mx-2 font-bold"
            >lodash</a>
            und
            <a
              href="https://momentjs.com/docs/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-green-600 mx-2 font-bold"
            >moment</a>
            verwenden.
          </div>
          <div
            id="my-Query-Editor-Place"
            class="w-full h-96 max-h-20v z-auto border border-gray-600"
          >
            <prism-editor
              v-model="queryToEdit.queryString"
              class="my-editor"
              :highlight="highlighter"
              line-numbers
              @input="onCodeChange"
            />
          </div>
          <!-- #################### RUN QUERY #################### -->
          <button class="btn-icon bg-red-700 text-white" />
        </div>
        <div class="flex my-4">
          <div
            id="my-Query-Result-Editor-Place"
            class="w-full overflow-hidden flex flex-col max-h-20v min-h-128"
          >
            <v-jsoneditor
              v-model="outputEditor.outputData"
              :options="outputEditor.options"
              :plus="true"
              class="flex-grow overflow-hidden"
            />
          </div>
        </div>
      </div>
      <div class="flex-grow-0 flex flex-row items-end p-4">
        <!-- #################### FORM BUTTONS #################### -->
        <button
          class="flex items-center flex-grow-0 mr-8 py-2 px-4 ml-auto capitalize tracking-wide bg-green-600 text-gray-800 font-medium rounded focus:outline-none"
          @click="saveEditedQuery()"
        >
          <span class="mx-1">Query Speichern</span>
        </button>
        <button
          class="flex items-center flex-grow-0 py-2 px-4 capitalize tracking-wide bg-gray-600 text-white font-medium rounded focus:outline-none"
          @click="clearQueryToEdit()"
        >
          <span class="mx-1">Abbrechen</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import VJsoneditor from "../VueJsoneditor";
// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
    name: "QueryListConfig",
    props: ["config"],
    data() {
        return {
            test: " Hallo ",
            outputEditor: {
                options: {
                    mode: "view",
                    sortObjectKeys: true,
                    navigationBar: false,
                    name: "issueData",
                },
                outputData: {},
            },
        };
    },
    mounted() {
        console.log("mounted");
    },
    computed: {
        ...mapGetters("FilterQuerys", [
            "allQuerys",
            "selected",
            "result",
            "inputData",
            "queryToEdit",
        ]),
    },
    watch: {
        //Wird eine Query zum editieren makiert den Ergebniss Editor updaten
        queryToEdit() {
            if (this.queryToEdit) {
                this.updateResult()
            }
        },
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
        ]),

        ...mapActions("JsonData", ["setInputData", "setOutputData"]),
        /**
         * Speichert die editierte Query
         */
        saveEditedQuery() {
            this.queryToEdit.edit = false;
            this.add({ query: this.queryToEdit, list: this.queryToEdit.listTosave });
            this.clearQueryToEdit();
        },
        /**
         * Codehighliter von Prism Editor
         */
        highlighter(_code) {
            return highlight(_code, languages.js); //returns html
        },
        /**
         * Updated den Ergebnnis Editor
         */
        updateResult(){
            this.outputEditor.outputData = this.result({
                query: this.queryToEdit,
            });
        },
        /** 
         * Bei Code änderung in Prism Editor den Code ausführen und in Ergebniseditor
         * @param {String} _code //Code aus dem Editor, nicht verwendeet
         */
        onCodeChange() {
            this.updateResult()
        },
    },
    components: {
        "v-jsoneditor": VJsoneditor,
        PrismEditor,
    },
    $el: "root",
};
</script>

<style scoped lang='postcss'>
.my-editor {
    color: #ccc;
    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
    width: 100%;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
    outline: none;
}
</style>
