<template lang="html">

  <section class="query-item">
    <h1>query-item Component</h1>
  </section>

</template> 

<script lang="js">
import { mapGetters } from 'vuex'


  export default  {
    name: 'query-item',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {
 ...mapGetters('FilterQuerys',[
          'test'
        ])
    }
}


</script>

<style scoped lang="scss">
  .query-item {

  }
</style>
