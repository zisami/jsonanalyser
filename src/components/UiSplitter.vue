<template>
    <splitpanes class="default-theme flex-grow " horizontal :push-other-panes="false" style="height: 400px">
        <pane v-bind:size="filterPaneSize.active" class="flex flex-col">
            <query-list></query-list>
        </pane>
        <pane min-size="25" max-size="90" size:="75" class="flex-grow" v-bind:size="editorsPaneSize.active">
            <splitpanes :push-other-panes="false" v-on:resized="saveEditorsSize">
                <pane min-size="0" max-size="100" v-bind:size="inputPaneSize.active"
                    class="flex flex-col flex-grow overflow-hidden">
                    <div class=" flex flex-col flex-grow overflow-hidden">
                        <div
                            class="bg-gray-900 opacity-30 flex flex-row justify-end select-none border-opacity-20 border-gray-100 border-b-2">
                            <ToogleSplitPane paneName="input" />
                        </div>
                        <div id="inputEditorPlace" class="flex flex-col flex-grow overflow-y-hidden">
                            <v-jsoneditor v-model="inputData" :options="inputEditor.options" :plus="true"
                                @error="onError" class="flex-grow overflow-hidden" />
                        </div>
                    </div>
                </pane>
                <pane min-size="0" max-size="100" class="flex flex-col flex-grow overflow-hidden"
                    v-bind:size="outputPaneSize.active">
                    <div class=" flex flex-col flex-grow overflow-hidden">
                        <div
                            class="bg-gray-900 opacity-30 flex flex-row  select-none border-opacity-20 border-gray-100 border-b-2">
                            <ToogleSplitPane paneName="output" invertIcon="true" />
                        </div>
                        <div id="outputEditorPlace" class="flex flex-col flex-grow  overflow-hidden">
                            <v-jsoneditor v-model="outputEditor.json" :options="outputEditor.options" :plus="true"
                                @error="onError" class="flex-grow overflow-hidden" />
                        </div>
                    </div>
                </pane>
            </splitpanes>
        </pane>
    </splitpanes>
</template>

<script>
//External COmponents
import { mapGetters, mapActions } from "vuex";

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import VJsoneditor from "v-jsoneditor";

//Internal Components
import ToogleSplitPane from "./ToogleSplitPane";
import QueryList from "./querylist/QueryList";

export default {
    name: "UiSplitter",
    data: function () {
        return {
            lastJsonData: {},
            inputEditor: {
                options: {
                    mode: "view",
                    sortObjectKeys: true,
                    navigationBar: false,
                    name: "issueData",
                    onError: function (err) {
                        alert(err.toString());
                    },
                },
            },
            outputEditor: {
                options: {
                    mode: "view",
                    sortObjectKeys: true,
                    navigationBar: false,
                    name: "issueData",
                },
                json: {
                    string: "string",
                    number: 123456,
                    boolean: true,
                    empty: "",
                    array: ["a", "b", 1, true],
                    object: {
                        string: "string",
                        number: 123456,
                        boolean: false,
                        empty: "",
                        array: ["a", "b", 1, true],
                    },
                    object2: {
                        string: "string",
                        number: 123456,
                        boolean: false,
                        empty: "",
                        array: ["a", "b", 1, true],
                    },
                    __wasanderes: {
                        string: "string",
                        number: 123456,
                        boolean: false,
                        empty: "",
                        array: ["a", "b", 1, true],
                    },
                },
            },
        };
    },
    computed: {
        ...mapGetters([
            "inputPaneSize",
            "outputPaneSize",
            "filterPaneSize",
            "editorsPaneSize",
        ]),
        ...mapGetters("FilterQuerys", ["inputData"]),
        inputData: () => {
            return window.inputData;
        }
    },
    watch: {
    },
    created() {
        this.loadPlaceholderJson();
    },
    methods: {
        ...mapActions("FilterQuerys", ["add", "setInputData"]),
        loadPlaceholderJson() {
            console.log("Getting Test Json"); 
            fetch("https://jsonplaceholder.typicode.com/todos/")
                .then((response) => response.json())
                .then((json) => {
                    window.inputData = json;
                    return json;
                })
                .then((json) => {
                    console.log("API result:", json);
                });
        },
        saveEditorsSize() {
            console.log("?!!??");
        },
        onError() {
            console.log("error");
        },
    },
    components: { Splitpanes, Pane, ToogleSplitPane, VJsoneditor, QueryList },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
