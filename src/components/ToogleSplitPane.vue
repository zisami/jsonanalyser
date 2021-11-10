<template>
  <div>
    <button
      class="btn icon text-gray-50 select-none "
    >
      <span
        v-show="!isOpen"
        class="material-icons block"
        @click="toggle"
      >arrow_left</span>
      <span
        v-show="isOpen"
        class="material-icons"
        @click="toggle"
      >arrow_right</span>
    </button>
  </div>
</template>

<script lang="js">
import { mapGetters, mapActions } from "vuex";
  export default  {
    name: 'ToogleSplitPane',
    props: ['paneName','paneWidth', 'invertIcon'],
    data () {
      return {
      }
    },
    mounted () {
 
    },
    methods: {
      ...mapActions([
            "onResizedFilter",
            "onResizedInput",
            "toggleFilterPane",
            'toggleEditorPane',
        ]),
      toggle(){
        //EventBus.$emit('tooglePain' , this.$props.paneName);
        console.log({ paneName: this.$props.paneName, nowSize: this.$props.paneWidth });
        if (this.$props.paneName === 'filter') {
          this.toggleFilterPane({ paneName: this.$props.paneName, nowSize: this.$props.paneWidth });
        } else {
          this.toggleEditorPane({ paneName: this.$props.paneName, nowSize: this.$props.paneWidth });
        }
        
        this.isOpen = !this.isOpen;
      }
    },
    computed: {
      ...mapGetters([
            "inputPaneSize",
            "outputPaneSize",
            "filterPaneSize",
            "editorsPaneSize",
        ]),
    isOpen: {
      get() {
        const width = this.$props.paneWidth;
        let result = width > 0 ? true : false
        result = this.$props.invertIcon ? !result : result
        return result;
      },

      set(value){
        return value;
      }
      }
    }
}


</script>

<style scoped lang="postcss">
</style>
