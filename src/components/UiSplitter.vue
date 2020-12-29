<template>
    <splitpanes class="default-theme flex-grow " horizontal :push-other-panes="false" style="height: 400px">
        <pane v-bind:size="filterPaneSize.active" class="flex flex-col">
            
            <query-list v-bind:config="configLiveQuerys"></query-list>
        </pane>
        <pane min-size="25" max-size="90" size:="75" class="flex-grow" v-bind:size="editorsPaneSize.active">
            <splitpanes :push-other-panes="false" v-on:resized="saveEditorsSize">
                <pane min-size="0" max-size="100" v-bind:size="inputPaneSize.active"
                    class="flex flex-col flex-grow overflow-hidden">
                    <div class=" flex flex-col flex-grow overflow-hidden">
                        <div class="bg-gray-900 opacity-30 flex flex-row pl-2 content-center justify-between select-none border-opacity-20 border-gray-100 border-b-2">
                            <div class="data-size flex flex-col justify-center text-sm ">{{inputDataSize}} / {{inputDataCount}} Datapoint{{inputDataCount > 1 ? 's' : ''}}</div> 
                            <ToogleSplitPane paneName="input" class="ml-auto"/>
                        </div>
                        <div id="inputEditorPlace" class="flex flex-col flex-grow overflow-y-hidden">
                            <v-jsoneditor v-model="inputData"  :plus="true" optionType="input"
                                @error="onError" class="flex-grow overflow-hidden" />
                        </div>
                    </div>
                </pane>
                <pane min-size="0" max-size="100" class="flex flex-col flex-grow overflow-hidden"
                    v-bind:size="outputPaneSize.active">
                    <div class=" flex flex-col flex-grow overflow-hidden">
                        <div
                            class="bg-gray-900 opacity-30 flex flex-row justify-between pr-2 select-none border-opacity-20 border-gray-100 border-b-2">
                            <ToogleSplitPane paneName="output" invertIcon="true" />
                            <div class="data-size flex flex-col justify-center text-sm justify-self-end">{{outputDataSize}} / {{outputDataCount}} Datapoint{{outputDataCount > 1 ? 's' : ''}}</div>
                        </div>
                        <div id="outputEditorPlace" class="flex flex-col flex-grow  overflow-hidden">
                            <v-jsoneditor v-model="outputData" :options="outputEditor.options" :plus="true"
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
import VJsoneditor from "./VueJsoneditor";

//Internal Components
import ToogleSplitPane from "./ToogleSplitPane";
import QueryList from "./querylist/QueryList";

export default {
    name: "UiSplitter",
    data: function () {
        return {
            
            configLiveQuerys: {
                listTitle: "Live Filter Querys",
                listKey: "liveQuerys",
                open: true,
            },

            lastJsonData: {},
            inputEditor: {
               
            },
            outputEditor: {
                options: {
                    mode: "view",
                    sortObjectKeys: true,
                    navigationBar: false,
                    name: "Output",
                    onError: function (err) {
                        alert(err.toString());
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

        ...mapGetters("JsonData", [
            "inputData",
            "outputData",
            "inputDataSize",
            "outputDataSize",
            "inputDataCount",
            "outputDataCount",
        ]),
    },
    watch: {},
    created() {
        this.loadPlaceholderJson();
    },
    methods: {
        ...mapActions("FilterQuerys", ["add", "setInputData", "listResults"]),
        ...mapActions("JsonData", ["setInputData", "setOutputData"]),
        loadPlaceholderJson() {
            fetch("https://jsonplaceholder.typicode.com/users/")
                .then((response) => response.json())
                .then((json) => {
                    this.setInputData(json);
                });
        },
        saveEditorsSize() {},
        onError() {
            console.log("error");
        },
    },
    components: { Splitpanes, Pane, ToogleSplitPane, VJsoneditor, QueryList },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
</style>
