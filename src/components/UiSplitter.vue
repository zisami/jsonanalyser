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
    <pane>
      <splitpanes :push-other-panes="false">
        <pane>
          <span>input</span>
        </pane>
        <pane>
          <span>output</span>
        </pane>
        <pane>
          <span>formdata</span>
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

export default {
  name: "UiSplitter",
  components: { Splitpanes, Pane },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
