<template>
  <div v-show="!runningInIframe" class="text-input-container">
    <textarea
      class="input-data-field"
      name="textarea"
      v-model="inputDataField"
      rows="3"
      cols="50"
      placeholder="Paste your JSON here"
      @focus="$event.target.select()"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "textInput",
  props: [],
  data() {
    return {
      inputDataField: {},
    };
  },
  created() {
    this.inputDataField = "";
  },
  mounted() {},
  methods: {
    ...mapActions("JsonData", ["setInputData"]),
    toggle() {},
  },
  computed: {
    ...mapGetters([]),
    runningInIframe: {
      get() {
        try {
          return window.self !== window.top;
        } catch (e) {
          return true;
        }
      },
    },
  },
  watch: {
    inputDataField(value) {
      let valueToShow = {};
      const cleaningRegex = /\n|\r|\t/gi;
      const cleanedValue = value.replaceAll(cleaningRegex, "");
      if (cleanedValue) {
        try {
          valueToShow = JSON.parse(cleanedValue);
        } catch (error) {
          valueToShow.error = error.message;
        }

        this.setInputData(valueToShow);
        return JSON.parse(cleanedValue);
      } else {
        this.setInputData({ Daten: "ja bitte" });
      }
    },
  },
};
</script>

<style scoped lang="postcss">
.text-input-container {
  display: flex;
  flex-direction: column;
}
.input-data-field {
  //background-color: #fff;
  @apply bg-black bg-opacity-10 border-gray-900 border-opacity-20;
}
</style>
 