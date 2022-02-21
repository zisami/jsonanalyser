<template>
  <section class="flex flex-col flex-grow ">
    <div class="bg-gray-800 opacity-75 flex flex-row justify-between pr-2 select-none border-opacity-20 border-gray-100 border-b-2">
      <ToogleSplitPane
        pane-name="filter"
        invert-icon="true"
        :pane-width="filterPaneSize.active"
        class="  border-blue-500 border-b-2 transform rotate-90 origin-center"
      />
      <button
        class="btn icon text-gray-50 select-none "
        @click="resetUI()"
      >
        <span
          class="material-icons block"
        >undo</span>
      </button>
    </div>
    <splitpanes
      class="default-theme flex-grow "
      horizontal
      :push-other-panes="false"
      style="height: 400px"
      @resized="saveFilterSize($event)"
    >
      <pane
        :size="filterPaneSize.active"
        class="flex flex-col bg-pink-400"
      >
        <textarea
          class="input-data-field"
          name="textarea"
          v-model="inputDataField"
          rows="3"
          cols="50"
          placeholder="Schmeiß deine Antrags-Daten hier rein."
          @focus="$event.target.select()"
        />
        <query-list :config="configLiveQuerys" />
      </pane>
      <pane
        min-size="25"
        max-size="90"
        size:="75"
        class="flex-grow"
        :size="editorsPaneSize.active"
      >
        <splitpanes
          :push-other-panes="false"
          @resized="saveEditorsSize($event)"
        >
          <pane
            min-size="0"
            max-size="100"
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
            min-size="0"
            max-size="100"
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
  data: function () {
    return {
      configLiveQuerys: {
        listTitle: "Live Filter Querys",
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
      inputDataField: {},
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
  watch: {
    inputDataField(value) {
      console.log(value);
      let valueToShow = {};
      const cleanerRegex = /\n|\r|\n\r/ig;
      const cleanedValue = value.replaceAll(cleanerRegex, '');
      if (value) {
        try {
         valueToShow = JSON.parse(cleanedValue);
        } catch (error) {
            console.log(error);
            valueToShow.error = error.message;
          //return false;
        }

        this.setInputData(valueToShow);
        return JSON.parse(value);
      } else {
        this.setInputData({ Daten: "ja bitte" });
      }
      // return JSON.parse(value);
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
      "onResizedInput",
      "toggleFilterPane",
      "resetUI",
    ]),
    loadPlaceholderJson() {
      this.setInputData();
      this.inputDataField = "";
    },
    saveFilterSize(_event) {
      console.log(_event);
      this.onResizedFilter({
        paneName: "filter",
        nowSize: _event[0].size,
      });
    },
    saveEditorsSize(_event) {
      console.log(_event);
      this.onResizedInput({ paneName: "input", nowSize: _event[0].size });
    },
    onError() {
      console.log("error");
    },
  },
  components: { Splitpanes, Pane, ToogleSplitPane, VJsoneditor, QueryList },
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
