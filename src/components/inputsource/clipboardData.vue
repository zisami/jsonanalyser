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
      valueToShow: {Tipp: "You can paste data from your clipboard by pressing Ctrl+V"},
    };
  },

  methods: {
    ...mapActions("JsonData", ["setInputData", "setOutputData"]),

    onClipboardData(event) {
      event?.preventDefault();

      let valueToShow = this.valueToShow

      let pastedData = (event.clipboardData || window.clipboardData)?.getData(
        "text"
      );
      if (pastedData) {
        console.log('pastedData', pastedData);
        const cleaningRegex = /\n|\r|\n\r/gi;
        const cleanedValue = pastedData.replaceAll(cleaningRegex, "");
        if (cleanedValue) {
          console.log("cleanedValue", cleanedValue);
          try {
            valueToShow = JSON.parse(cleanedValue);
          } catch (error) {
            console.log('error', error);
            valueToShow.error = "🐞 " + error.message;
            console.log(valueToShow.error);
          }
        }
      }
      this.setInputData(valueToShow);
    },
  },
  mounted() {
    window.addEventListener("paste", this.onClipboardData);
    //this.setInputData(this.valueToShow);
  },
  beforeDestroy() {
    window.removeEventListener("paste");
  },
};
</script>

<style scoped lang="postcss">
</style>
 