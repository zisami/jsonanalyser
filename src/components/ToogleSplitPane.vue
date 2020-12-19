<template>

    <button class="btn icon flex flex-row jusitfy-end text-gray-50 select-none">
        <span
            class="material-icons"
            v-on:click="toggle"
            v-show="!isOpen"
        >arrow_left</span>
        <span
            class="material-icons"
            v-on:click="toggle"
            v-show="isOpen"
        >arrow_right</span>
    </button>

</template>

<script lang="js">

  export default  {
    name: 'ToogleSplitPane',
    props: ['paneName', 'invertIcon'],
    mounted () {
 
    },
    data () {
      return {
      }
    },
    methods: {
      toggle(){
        //EventBus.$emit('tooglePain' , this.$props.paneName);
                this.$store.dispatch('toggleEditorPane', { paneName: this.$props.paneName, nowSize: this.$parent.style.width });
                this.isOpen = !this.isOpen;
      }
    },
    computed: {
    isOpen: {
      get() {const width = this.$parent.style.width;
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
