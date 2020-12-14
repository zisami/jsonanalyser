<template lang="html">

  <section class="query-list">
    <h1 >{{allQuerys}}</h1>
    {{this.$store.FilterQuerys}}
    <query-item />
  </section>

</template>

<script lang="js">

import { mapGetters } from 'vuex'
import  QueryItem  from "./QueryItem";


  export default  {
    name: 'query-list',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },computed: {

    ...mapGetters('FilterQuerys',[
          'allQuerys',
          'selected'
        ])
    },
    methods: {

    },
    
    components:{
      QueryItem
    }
}


</script>

<style scoped lang="scss">
.query-list {
}
</style>
