<template>
  <splitpanes
    class="default-theme flex-grow "
    horizontal
    :push-other-panes="false"
    style="height: 400px"
  >
    <pane>
      <span>filter</span>
    </pane>
    <pane
      min-size="25"
      max-size="90"
      size:="75"
      class="flex-grow"
    >
      <splitpanes :push-other-panes="false">
        <pane
          min-size="0"
          v-bind:size="inputSize.active"
          class="flex flex-col flex-grow"
        >
          <div class=" bg-pink-600 flex-grow">
            input
          </div>
          <div class="bg-pink-800">
            <ToogleSplitPane paneName="input" />
            <div
             v-on:tooglePain-input="toogleSizeInput"
            ></div>
          </div>
        </pane>
        <pane class="flex flex-col flex-grow">
          <span>output</span>
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script lang="js">
import {EventBus} from '../main'
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import ToogleSplitPane from "./ToogleSplitPane";
console.log(EventBus);
export default {
  name: "UiSplitter",
  data: function () {
    return {
      inputSize: {orig:50, last:50, active:50},
      outputSize: "50%",
    };
  },
  created(){
    EventBus.$on('tooglePain-input',this.toogleSizeInput(eventData))
  },
  methods: {
    toogleSizeInput(eventData) {
      if (eventData == 'input') {
        if (this.outputSize.active !== 0) {
          
        } else {
          
        }
        this.inputSize.active = 0;
      } else {
        
      }
      
      console.log("inputSize", this.inputSize);
    },
  },
  components: { Splitpanes, Pane, ToogleSplitPane },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.closed {
  width: 2rem;
}
</style>
