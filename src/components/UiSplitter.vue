<template>
  <splitpanes
    class="default-theme flex-grow "
    horizontal
    :push-other-panes="false"
    style="height: 400px"
  >
    <pane v-bind:size="filterPaneSize.active">
      <span>filter{{this.$store.test}}</span>
    </pane>
    <pane
      min-size="25"
      max-size="90"
      size:="75"
      class="flex-grow"
      v-bind:size="editorsPaneSize.active"
    >
      <splitpanes
        :push-other-panes="false"
        v-on:resized="saveEditorsSize"
      >
        <pane
          min-size="0"
          max-size="100"
          v-bind:size="inputPaneSize.active"
          class="flex flex-col flex-grow"
        >
          <div class=" flex flex-col flex-grow">
            <div class="bg-gray-900 opacity-30 flex flex-row justify-end select-none border-opacity-20 border-gray-100 border-b-2">
              <ToogleSplitPane paneName="input" />
            </div>
            <div
              id="inputEditorPlace"
              class="flex flex-col flex-grow"
            >
              <v-jsoneditor
                v-model="inputEditor.json"
                :options="inputEditor.options"
                :plus="true"
                @error="onError"
                class="flex-grow"
              />
            </div>
          </div>
        </pane>
        <pane
          min-size="0"
          max-size="100"
          class="flex flex-col flex-grow"
          v-bind:size="outputPaneSize.active"
        >
          <div class=" bg-green-600 flex flex-col flex-grow">
            <div class="bg-black opacity-10 flex justify-items-end select-none">
              <ToogleSplitPane
                paneName="output"
                invertIcon="true"
              />
            </div>
            <div id="outputEditorPlace"></div>
          </div>

        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script lang="js">
import { mapGetters } from 'vuex'
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import ToogleSplitPane from "./ToogleSplitPane";
import VJsoneditor from 'v-jsoneditor'


export default {
  name: "UiSplitter",
  data: function () {
    return {
      inputEditor:{
        options:{
          mode: 'view',
          sortObjectKeys: true,
          navigationBar: false,
          name: "issueData",
        },
        json:{string: 'string', number: 123456, boolean: true, empty: '', array: ['a','b',1,true], object:{string: 'string', number: 123456, boolean: false, empty: '', array: ['a','b',1,true]}}
      }
      
    };
  },computed: {
    ...mapGetters([
      'inputPaneSize',
      'outputPaneSize',
      'filterPaneSize',
      'editorsPaneSize'
    ])
  },
  created(){
  },
  methods: {
    saveEditorsSize(){
      console.log('?!!??');
    } ,
    onError() {
            console.log('error')
        }
  },
  components: { Splitpanes, Pane, ToogleSplitPane, VJsoneditor},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
