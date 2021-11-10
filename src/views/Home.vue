<template>
  <div class="home">
    <ui-splitter />
    <config-query />
    <saved-querys :config="configAllQuerys" />
    <input-selection />
  </div>
</template>

<script>
// @ is an alias to /src
import UiSplitter from "@/components/UiSplitter.vue";
import ConfigQuery from "@/components/querylist/ConfigQuery";
import SavedQuerys from "@/components/querylist/SavedQuerys";
import InputSelection from '../components/inputsource/InputSelection.vue';

//import ConfigQuery from "../components/querylist/configQuery.vue";
export default {
    name: "Home",
    components: {
        "ui-splitter": UiSplitter,
        "config-query": ConfigQuery,
        "saved-querys": SavedQuerys,
        "input-selection" : InputSelection
    },
    data() {
        return {
            configAllQuerys: {
                listTitle: "Alle meine Filter Querys",
                listKey: "allQuerys",
                open: false,
            },
        };
    },
};
</script>
