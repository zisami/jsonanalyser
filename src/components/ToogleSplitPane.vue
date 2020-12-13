<template>

  <button class="btn icon flex flex-row jusitfy-end">
    <span
      class="material-icons"
      v-on:click="toogleEvent"
      v-show="isOpen"
    >arrow_left</span>
    <span
      class="material-icons"
      v-on:click="toogleEvent"
      v-show="!isOpen"
    >arrow_right</span>
  </button>

</template>

<script lang="js">
import {EventBus} from '../main'
  export default  {
    name: 'ToogleSplitPane',
    props: ['paneName'],
    mounted () {

    },
    data () {
      return {
        isOpen: true
      }
    },
    methods: {
      toogleEvent(){
        EventBus.$emit('tooglePain' , this.$props.paneName);
        this.isOpen = !this.isOpen;
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">

</style>
