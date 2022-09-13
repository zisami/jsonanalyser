<template>
<section class="flex flex-col flex-grow ">

    <splitpanes
      class="default-theme flex-grow "
      horizontal
      :push-other-panes="false"
      style="height: 400px"
      @resized="saveFilterSize($event)"
    >
    <!-- Editors -->
   <pane
        
        size:="100"
        class="flex-grow"
        :size="editorsPaneSize.active"
      >
        <splitpanes
          :push-other-panes="false"
          @resized="saveEditorsSize($event)"
        >
          <pane
            
            :size="inputPaneSize.active"
            class="flex flex-col flex-grow overflow-hidden"
          >
            <div class=" flex flex-col flex-grow overflow-hidden">
              <div class="bg-gray-800 opacity-75 flex flex-row pl-2 content-center justify-between select-none border-opacity-20 border-gray-100 border-b-2">
                <div class="data-size flex flex-col justify-center text-sm ">
                  {{ inputDataSize }} / {{ inputDataCount }} Datapoint{{ inputDataCount > 1 ? 's' : '' }}
                </div> 
                <ToogleSplitPane
                  pane-name="input"
                  :pane-width="inputPaneSize.active"
                  class="ml-auto"
                  invert-icon="true"
                />
              </div>
              <div
                id="inputEditorPlace"
                class="flex flex-col flex-grow overflow-y-hidden"
              >
                <v-jsoneditor
                  v-model="inputData"
                  :plus="true"
                  option-type="input"
                  class="flex-grow overflow-hidden"
                  @error="onError"
                />
              </div>
            </div>
          </pane>
          <pane
          
            class="flex flex-col flex-grow overflow-hidden"
            :size="outputPaneSize.active"
          >
            <div class=" flex flex-col flex-grow overflow-hidden">
              <div
                class="bg-gray-800 opacity-75 flex flex-row justify-between pr-2 select-none border-opacity-20 border-gray-100 border-b-2"
              >
                <ToogleSplitPane
                  pane-name="output"
                  :pane-width="outputPaneSize.active"
                />
                <div class="data-size flex flex-col justify-center text-sm justify-self-end">
                  {{ outputDataSize }} / {{ outputDataCount }} Datapoint{{ outputDataCount > 1 ? 's' : '' }}
                </div>
              </div>
              <div
                id="outputEditorPlace"
                class="flex flex-col flex-grow  overflow-hidden"
              >
                <v-jsoneditor
                  v-model="outputData"
                  :options="outputEditor.options"
                  :plus="true"
                  class="flex-grow overflow-hidden"
                  @error="onError"
                />
              </div>
            </div>
          </pane>
        </splitpanes>
      </pane>
      <!-- Filter -->
    
      <pane
      style="min-height: 36px"
        :size="filterPaneSize.active"
        class="flex flex-col bg-pink-400"
      >
      <div class="bg-gray-800 opacity-75 flex flex-row justify-between pr-2 select-none border-opacity-20 border-gray-100 border-b-2">
      <ToogleSplitPane
        pane-name="filter"
        invert-icon=false
        :pane-width="filterPaneSize.active"
        class="  border-blue-500 border-b-2 transform rotate-90 origin-center"
      />
      {{numOfQuerys}}
      <button
        class="btn icon text-gray-50 select-none "
        @click="resetUI()"
      >
        <span
          class="material-icons block"
        >undo</span>
      </button>
    </div>
        <query-list 
        :config="configLiveQuerys" 
        />
      </pane>
       
    </splitpanes>
    <iframeCommunication v-show="runningInIframe"/>
    <clipboardData v-show="false"/>
  </section>
</template>

<script>
//External COmponents
import { mapGetters, mapActions } from "vuex";

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import VJsoneditor from "./VueJsoneditor";
import iframeCommunication from "./inputsource/iframeCommunication";
import clipboardData from "./inputsource/clipboardData";

//Internal Components
import ToogleSplitPane from "./ToogleSplitPane";
import QueryList from "./querylist/QueryList";

export default {
  name: "UiSplitter",
  data: function () {
    return {
      configLiveQuerys: {
        listTitle: "Filter Querys",
        listKey: "liveQuerys",
        open: true,
      },
      lastJsonData: {},
      inputEditor: {},
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
    ...mapGetters("FilterQuerys", [
      "allQuerys",
      "getQueryList",
      "selected",
      "result",
    ]),
    numOfQuerys() {
      return this.getQueryList(this.configLiveQuerys.listKey).length;
    },
  },
  watch: {
    numOfQuerys(num) {
      console.log("openOutputOnFirstQuery", num, this.outputPaneSize.active );
      if (num === 1 && this.outputPaneSize.active === 0) {
        this.openOutputPane();
      }
    },
  },
  created() {
    this.loadPlaceholderJson();
  },
  methods: {
    ...mapActions("FilterQuerys", ["add", "setInputData", "listResults"]),
    ...mapActions("JsonData", ["setInputData", "setOutputData"]),
    ...mapActions([
      "onResizedFilter",
      "toggleDataLoaderPane",
      "onResizedInput",
      "toggleFilterPane",
      "resetUI",
      "openOutputPane",
    ]),
    loadPlaceholderJson() {
      this.setInputData();
    },
    saveFilterSize(_event) {
      console.log("saveFilterSize", _event);
      this.onResizedFilter({
        paneName: "filter",
        nowSize: _event[1].size,
      });
    },
    saveEditorsSize(_event) {
      console.log("saveEditorsSize", _event);
      this.onResizedInput({ paneName: "input", nowSize: _event[0].size });
    },
    onError() {
      console.log("error");
    },
    runningInIframe() {
      return window.top !== window.self;
    },
  },
  components: {
    Splitpanes,
    Pane,
    ToogleSplitPane,
    VJsoneditor,
    QueryList,
    iframeCommunication,
    clipboardData,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
.input-data-field {
  //background-color: #fff;
  @apply bg-black bg-opacity-10 border-gray-900 border-opacity-20;
}
.greetings-4-kollegs {
  padding: 0.75rem;
  text-align: center;
  a {
    font-weight: bold;
  }
}
</style>
