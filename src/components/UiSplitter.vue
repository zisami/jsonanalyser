<template>
<section class="flex flex-col flex-grow ">
    <div class="greetings-4-kollegs">Für die lieben Accenture und RLB Kollegen die keine Extention-Rechte erwischt haben. 
    Kopf hoch es kann sich nur mehr um Jahre handln. &#128512; <br> 
    Beschwerden an <b><a href="mailto:who-cares@i-dont.know"> who-cares@i-dont.know </a></b>,  
    Verbesserungen/Vorschläge/Mitarbeit bitte an <b><a href="mailto:sascha.zika@accenture.com?subject=Feedbak%20from%20loving-payne-ec21b9.netlify.app">mich</a>. </b> LG Sascha</div>
    <div class="bg-gray-900 opacity-30 flex flex-row justify-between pr-2 select-none border-opacity-20 border-gray-100 border-b-2">
            <ToogleSplitPane paneName="filter" invertIcon="true" v-bind:paneWidth="filterPaneSize.active" class="  border-blue-500 border-b-2 transform rotate-90 origin-center"/>
            <button class="btn icon text-gray-50 select-none " v-on:click="resetUI()">
            <span
                class="material-icons block"
                >undo</span>

        </button>
        </div>
    <splitpanes class="default-theme flex-grow " horizontal :push-other-panes="false" style="height: 400px" v-on:resized="saveFilterSize($event)">
        <pane v-bind:size="filterPaneSize.active" class="flex flex-col bg-pink-400">
            <textarea @focus="$event.target.select()" class="input-data-field" name="textarea" rows="3" cols="50" v-model="inputDataField" placeholder="Schmeiß deine Antrags-Daten hier rein."></textarea>
            <query-list v-bind:config="configLiveQuerys"></query-list>
        </pane>
        <pane min-size="25" max-size="90" size:="75" class="flex-grow" v-bind:size="editorsPaneSize.active">
            <splitpanes :push-other-panes="false" v-on:resized="saveEditorsSize($event)">
                <pane min-size="0" max-size="100" v-bind:size="inputPaneSize.active"
                    class="flex flex-col flex-grow overflow-hidden">
                    <div class=" flex flex-col flex-grow overflow-hidden">
                        <div class="bg-gray-900 opacity-30 flex flex-row pl-2 content-center justify-between select-none border-opacity-20 border-gray-100 border-b-2">
                            <div class="data-size flex flex-col justify-center text-sm ">{{inputDataSize}} / {{inputDataCount}} Datapoint{{inputDataCount > 1 ? 's' : ''}}</div> 
                            <ToogleSplitPane paneName="input" v-bind:paneWidth="inputPaneSize.active" class="ml-auto" invertIcon="true" />
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
                            <ToogleSplitPane paneName="output" v-bind:paneWidth="outputPaneSize.active" />
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
</section>
    

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
    data: function() {
        return {
            configLiveQuerys: {
                listTitle: "Live Filter Querys",
                listKey: "liveQuerys",
                open: true
            },

            lastJsonData: {},
            inputEditor: {},
            outputEditor: {
                options: {
                    mode: "view",
                    sortObjectKeys: true,
                    navigationBar: false,
                    name: "Output",
                    onError: function(err) {
                        alert(err.toString());
                    }
                }
            },
            inputDataField:{}
            
        };
    },
    computed: {
        ...mapGetters([
            "inputPaneSize",
            "outputPaneSize",
            "filterPaneSize",
            "editorsPaneSize"
        ]),

        ...mapGetters("JsonData", [
            "inputData",
            "outputData",
            "inputDataSize",
            "outputDataSize",
            "inputDataCount",
            "outputDataCount"
        ]),

    },
    watch: {
        inputDataField(value) {
            console.log(value);
            if (value) {
                try {
                    JSON.parse(value);
                } catch (error) {
                    return false;
                }

                this.setInputData(JSON.parse(value));
                return JSON.parse(value)
            } else {
                this.setInputData({ Daten: "ja bitte" });
            }
           // return JSON.parse(value);
        }
    },
    created() {
        this.loadPlaceholderJson();
    },
    methods: {
        ...mapActions("FilterQuerys", ["add", "setInputData", "listResults"]),
        ...mapActions("JsonData", ["setInputData", "setOutputData"]),
        ...mapActions([
            "onResizedFilter",
            "onResizedInput",
            "toggleFilterPane",
            "resetUI"
        ]),
        loadPlaceholderJson() {
            fetch("https://jsonplaceholder.typicode.com/users/")
                .then(response => response.json())
                .then(json => {
                    this.setInputData(json);
                    this.inputDataField = JSON.stringify(json) ;
                });
        },
        saveFilterSize(_event) {
            console.log(_event);
            this.onResizedFilter({
                paneName: "filter",
                nowSize: _event[0].size
            });
        },
        saveEditorsSize(_event) {
            console.log(_event);
            this.onResizedInput({ paneName: "input", nowSize: _event[0].size });
        },
        onError() {
            console.log("error");
        }
    },
    components: { Splitpanes, Pane, ToogleSplitPane, VJsoneditor, QueryList }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
.input-data-field {
    //background-color: #fff;
    @apply bg-black bg-opacity-10 border-gray-900 border-opacity-20;
}
.greetings-4-kollegs{
    padding: 0.75rem;
    text-align: center;
    a {
        font-weight: bold;
    }
}
</style>
