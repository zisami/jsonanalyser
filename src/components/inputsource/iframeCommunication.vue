<template>
  <div class="communicationPlace"></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "iframeCommunication",
  props: [],
  data() {
    return {};
  },

  methods: {
    ...mapActions("JsonData", ["setInputData", "setOutputData"]),

    receiveMessage(event) {
      //console.log("JSONANALYSER says: ", event.data);
      const message = event.data;

      if (message?.sendTo === "json-sandbox") {
        switch (message.toDo) {
          case "showData":
            if (message.payload) {
              this.setInputData(message.payload);
            }
            break;

          default:
            break;
        }
      }
    },
  },
  mounted() {
    window.addEventListener("message", this.receiveMessage);

    const readyMessage = {
      sendTo: "jsonWrapper",
      toDo: "sendJson",
    };
    window.parent.postMessage(readyMessage, "*");
    //console.debug("JSONANALYSER says: ready", readyMessage, window.parent);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.receiveMessage);
  },
};
</script>

<style scoped lang="postcss">
</style>
 