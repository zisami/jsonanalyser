<template>
  <splitpanes
    class="default-theme flex-grow "
    horizontal
    :push-other-panes="false"
    style="height: 400px"
  >
    <pane v-bind:size="filterPaneSize.active">
      <span>filter{{this.$store.test}}</span>
      <query-list></query-list>
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
          class="flex flex-col flex-grow overflow-hidden"
        >
          <div class=" flex flex-col flex-grow overflow-hidden">
            <div class="bg-gray-900 opacity-30 flex flex-row justify-end select-none border-opacity-20 border-gray-100 border-b-2">
              <ToogleSplitPane paneName="input" />
            </div>
            <div
              id="inputEditorPlace"
              class="flex flex-col flex-grow overflow-y-hidden"
            >
              <v-jsoneditor
                v-model="inputEditor.json"
                :options="inputEditor.options"
                :plus="true"
                @error="onError"
                class="flex-grow overflow-hidden"
              />
            </div>
          </div>
        </pane>
        <pane
          min-size="0"
          max-size="100"
          class="flex flex-col flex-grow overflow-hidden"
          v-bind:size="outputPaneSize.active"
        >
          <div class=" flex flex-col flex-grow overflow-hidden">
            <div class="bg-gray-900 opacity-30 flex flex-row  select-none border-opacity-20 border-gray-100 border-b-2">
              <ToogleSplitPane paneName="output" invertIcon="true"/>
            </div>
            <div
              id="outputEditorPlace"
              class="flex flex-col flex-grow  overflow-hidden"
            >
              <v-jsoneditor
                v-model="outputEditor.json"
                :options="outputEditor.options"
                :plus="true"
                @error="onError"
                class="flex-grow overflow-hidden"
              />
            </div>
          </div>
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script lang="js">
//External COmponents
import { mapGetters } from 'vuex'
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import VJsoneditor from 'v-jsoneditor'

//Internal Components
import ToogleSplitPane from "./ToogleSplitPane";
import QueryList from "./querylist/QueryList";




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
        onError: function (err) {
            alert(err.toString())
        },
        onEvent: function (node, event) {
            //console.log(event.type);

            if (event.type === 'click') {
                if (Date.now() - this.lastClick < 250) {
                    console.log("Duble click", { node });
                    //let path = prettyPrintPath(node.path)
                    // let resultName = `data${typeof path === 'number' ? '.' : ''}${path}`;
                    // let query = `return data${typeof path === 'number' ? '.' : ''}${path}`;
                    
                }
                this.lastClick = Date.now();

            }
            // function prettyPrintPath(path) {
            //     let str = ''
            //     for (let i = 0; i < path.length; i++) {
            //         const element = path[i]
            //         if (typeof element === 'number') {
            //             str += '[' + element + ']'
            //         } else {
            //             if (str.length > 0) str += '.'
            //             str += element
            //         }
            //     }
            //     return str
            // }

        }

    },
        json:{string: 'string', number: 123456, boolean: true, empty: '', array: ['a','b',1,true], object:{string: 'string', number: 123456, boolean: false, empty: '', array: ['a','b',1,true]},object2:{string: 'string', number: 123456, boolean: false, empty: '', array: ['a','b',1,true]}, __wasanderes:{string: 'string', number: 123456, boolean: false, empty: '', array: ['a','b',1,true]}}
      },
      outputEditor:{
        options:{
          mode: 'view',
          sortObjectKeys: true,
          navigationBar: false,
          name: "issueData",
        },
        json:{string: 'string', number: 123456, boolean: true, empty: '', array: ['a','b',1,true], object:{string: 'string', number: 123456, boolean: false, empty: '', array: ['a','b',1,true]},object2:{string: 'string', number: 123456, boolean: false, empty: '', array: ['a','b',1,true]}, __wasanderes:{string: 'string', number: 123456, boolean: false, empty: '', array: ['a','b',1,true]}}
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
  components: { Splitpanes, Pane, ToogleSplitPane, VJsoneditor, QueryList},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
