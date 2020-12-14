<template lang="html">

  <section class="query-list">
    <h1 >{{test}}</h1>
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
          'test'
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
