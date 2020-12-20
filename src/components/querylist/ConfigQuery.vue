<template>
    <div
        class="inset-0 absolute bg-indigo-700 bg-opacity-90 flex justify-center items-center z-10"
    >
        <div class="bg-gray-800 max-h-80v">
            <div class="w-full p-4 flex-none rounded-t-xl font-bold">
                Filter Query Bearbeiten
            </div>
            <div class="flex-grow p-8 flex flex-col">
                <div class="flex flex-wrap my-4 items-center">
                    <input
                        type="text"
                        class="bg-transparent text-gray-400 border-b border-gray-300"
                    />
                    <div class="text-xs text-gray-500 w-full mt-2">
                        Der Key unter dem das Query Ergebniss angezeigt wird.
                    </div>
                </div>
                <div class="flex flex-wrap my-4 items-center">
                    <div class="mr-4 w-48">Query</div>
                    <div class="text-s text-gray-300 w-full my-2">
                        Schreibe deine Funktion wie du willst, du musst nur
                        einen Wert zurück geben. <br />
                        Du kannst
                        <a
                            href="https://lodash.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-blue-400 mx-2 font-bold"
                            >lodash</a
                        >
                        und
                        <a
                            href="https://momentjs.com/docs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-green-600 mx-2 font-bold"
                            >moment</a
                        >
                        verwenden.
                    </div>
                    <div
                        id="my-Query-Editor-Place"
                        class="w-full h-96 max-h-20v z-auto border border-gray-600"
                    ></div>
                    <!-- #################### RUN QUERY #################### -->
                    <button class="btn-icon bg-red-700 text-white"></button>
                </div>
                <div class="flex my-4">
                    <div
                        id="my-Query-Result-Editor-Place"
                        class="w-full overflow-y-auto max-h-20v min-h-128"
                    >
                        <v-jsoneditor
                            v-model="outputData"
                            :options="outputEditor.options"
                            :plus="true"
                            @error="onError"
                            class="flex-grow overflow-hidden"
                        />
                    </div>
                </div>
            </div>
            <div class="flex-grow-0 flex flex-row items-end px-4">
                <!-- #################### FORM BUTTONS #################### -->
                <button
                    class="flex items-center flex-grow-0 mr-8 py-2 px-4 ml-auto capitalize tracking-wide bg-green-600 text-gray-800 font-medium rounded focus:outline-none"
                >
                    <span class="mx-1">Query Speichern</span>
                </button>
                <button
                    class="flex items-center flex-grow-0 py-2 px-4 capitalize tracking-wide bg-gray-600 text-white font-medium rounded focus:outline-none"
                >
                    <span class="mx-1">Abbrechen</span>
                </button>
            </div>
            <div class="h-8"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
//import QueryItem from './QueryItem';
import { mapActions } from "vuex";
import VJsoneditor from "v-jsoneditor";

export default {
    name: "query-list-config",
    props: ["config"],
    mounted() {},
    data() {
        return {
            outputEditor: {
                options: {
                    mode: "view",
                    sortObjectKeys: true,
                    navigationBar: false,
                    name: "issueData",
                },
            },
        };
    },
    computed: {
        ...mapGetters("FilterQuerys", [
            "allQuerys",
            "selected",
            "result",
            "inputData",
        ]),
        ...mapGetters("JsonData", ["inputData", "outputData"]),
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
        ...mapActions("JsonData", ["setInputData", "setOutputData"]),
    },

    components: {
        "v-jsoneditor": VJsoneditor,
    },
};
</script>

<style scoped lang='postcss'>
</style>
