<template>
    <div class="home">
        <ui-splitter />
        <config-query />
    </div>
</template>

<script>
// @ is an alias to /src
import UiSplitter from "@/components/UiSplitter.vue";
import ConfigQuery from "@/components/querylist/ConfigQuery";
//import ConfigQuery from "../components/querylist/configQuery.vue";
export default {
    name: "Home",
    components: {
        "ui-splitter": UiSplitter,
        "config-query": ConfigQuery,
    },
};
</script>
