<template>
    <div class="home">
        <ui-splitter />
        <config-query />
        <saved-querys v-bind:config="configAllQuerys"/>
    </div>
</template>

<script>
// @ is an alias to /src
import UiSplitter from "@/components/UiSplitter.vue";
import ConfigQuery from "@/components/querylist/ConfigQuery";
import SavedQuerys from "@/components/querylist/SavedQuerys";

//import ConfigQuery from "../components/querylist/configQuery.vue";
export default {
    data() {
        return {
            configAllQuerys: {
                listTitle: "Alle meine Filter Querys",
                listKey: "allQuerys",
                open: false,
            },
        };
    },
    name: "Home",
    components: {
        "ui-splitter": UiSplitter,
        "config-query": ConfigQuery,
        "saved-querys": SavedQuerys
    },
};
</script>
