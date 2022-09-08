<template>
  <div class="clipboardPlace"></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "iframeCommunication",
  props: [],
  data() {
    return {
      valueToShow: {
        Tipp: "You can paste data from your clipboard by pressing Ctrl+V",
      },
    };
  },

  methods: {
    ...mapActions("FilterQuerys", ["listResults"]),
    ...mapActions("JsonData", ["setInputData", "setOutputData"]),

    onClipboardData(event) {
      if (!runningInSandbox()) {
        event?.preventDefault();
        let valueToShow = this.valueToShow;
        let pastedData = (event.clipboardData || window.clipboardData)?.getData(
          "text"
        );
        if (pastedData) {
          console.log("pastedData", pastedData);
          const cleaningRegex = /\n|\r|\n\r/gi;
          const cleanedValue = pastedData.replaceAll(cleaningRegex, "");
          if (cleanedValue) {
            console.log("cleanedValue", cleanedValue);
            try {
              valueToShow = JSON.parse(cleanedValue);
            } catch (error) {
              console.log("error", error);
              valueToShow.BUG =
                "#" +
                Math.floor(Math.random() * 7) +
                " " +
                randomBug() +
                " " +
                error.message;
              console.log(valueToShow.BUG);
            }
          }
        }
        this.setInputData({});
        this.setInputData(valueToShow);
        this.listResults()
      }

      function randomBug() {
        const bugs = ["🪲", "🐞", "🐛", "🦗", "🪳", "🦟", "🪰"];
        const randomIndex = Math.floor(Math.random() * (bugs.length - 1));
        console.log("randomIndex", randomIndex);
        return bugs[randomIndex];
      }
      function runningInSandbox() {
        try {
          localStorage.getItem("sandbox");
        } catch (error) {
          console.log(runningInSandbox, error);
          return true;
        }
        return false;
      }
    },
  },
  mounted() {
    document
      .querySelector("#inputEditorPlace .jsoneditor-tree")
      ?.addEventListener("paste", this.onClipboardData);
    //this.setInputData(this.valueToShow);
  },
  beforeDestroy() {
    window.removeEventListener("paste");
  },
};
</script>

<style scoped lang="postcss">
</style>
 