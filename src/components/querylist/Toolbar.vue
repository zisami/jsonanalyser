<template>
  <section
    class="query-list-tool-bar border-opacity-20 border-gray-100 border-b flex py-1 px-2 select-none"
  >
    <div class="buttons-allways flex content-center mr-4">
      <button
        class="btn"
        title="Neue Query anlegen"
        @click="add({ query: {}, list: config.listKey })"
      >
        <span class="material-icons hover:animate-wiggle"> note_add </span> 
      </button>
      <button
        v-if="config.listKey === 'liveQuerys'"
        class="btn"
        title="Gespeicherte Query öffnen"
        @click="toggleSavedQuerys()"
      >
        <span class="material-icons hover:animate-wiggle"> folder_open </span>
      </button>
    </div>
    <div
      class="buttons-selected hidden"
      :class="{ 'display-buttons-selected': selected(config.listKey).id }"
    >
      <button
        class="btn"
        title="Konfiguriere ausgewählte Query"
        @click="editSelected({ list: config.listKey })"
      >
        <span class="material-icons icon hover:animate-spin"> settings </span>
      </button>
      <button
        v-if="config.listKey === 'liveQuerys'"
        class="btn"
        title="ausgewählte Query speichern"
        @click="add({ query: selected(config.listKey), list: 'allQuerys' })"
      >
        <span class="material-icons hover:animate-pulse"> save </span>
      </button>
      <button
        class="btn"
        title="ausgewählte Query exportieren"
        @click="exportSelectedQuery(config.listKey)"
      >
        <span class="material-icons icon hover:animate-bounce"> upgrade </span>
      </button>
      <button
        class="btn"
        title="ausgewählte Query aus dieser Liste löschen"
        @click="removeSelected({ list: config.listKey })"
      >
        <span class="material-icons hover:animate-shrink"> delete </span>
      </button>
    </div>
    <div class="buttons-list-actions ml-auto flex">
      <button
        class="btn"
        title="Query Liste exportieren"
        @click="exportList(config.listKey)"
      >
        <span class="material-icons hover:animate-bounceUp"> upgrade </span>
      </button>
      <button
        class="btn"
        title="Query Liste importieren"
        @click.prevent="openImportList()"
      >
        <span class="material-icons hover:animate-bounce">  save_alt</span>
      </button>
      <input
        :id="'listImport' + config.listKey"
        type="file"
        multiple
        accept="application/JSON"
        style="display: none"
        @change="handleFiles"
      >
      <button
        class="btn"
        title="run all querys in list"
        @click="listResults()"
      >
        <span class="material-icons"> playlist_play </span>
      </button>
      <button
        class="btn"
        title="double click to clear list"
        @dblclick="removeAll(config.listKey)"
      >
        <span class="material-icons"> delete_sweep </span>
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
//import QueryItem from './QueryItem';
import { mapActions } from "vuex";

export default {
    name: "QueryListToolBar",
    props: ["config"],
    data() {
        return {};
    },
    mounted() {},
    computed: {
        ...mapGetters("FilterQuerys", ["allQuerys", "selected", "result"]),
    },
    methods: {
        ...mapActions("FilterQuerys", [
            "add",
            "remove",
            "removeSelected",
            "unselect",
            "select",
            "setInputData",
            "listResults",
            "editSelected",
            "removeAll",
            "exportList",
            "exportSelectedQuery",
            "toggleSavedQuerys",
        ]),
        openImportList() {
            const openImportList = document.getElementById(
                "listImport" + this.config.listKey
            );
            if (openImportList) {
                openImportList.click();
            }
        },
        handleFiles(_event) {
            console.log(_event);

            if (!_event.target.files.length) {
                return;
            } else {
                for (let i = 0; i < _event.target.files.length; i++) {
                    console.log(_event.target.files[i]);
                    const fileReader = new FileReader();
                    fileReader.onload = (_ev) => {
                        const jsonFromFile = JSON.parse(_ev.target.result);
                        console.log(jsonFromFile);
                        if (
                            Object.hasOwnProperty.call(jsonFromFile, "querys")
                        ) {
                            jsonFromFile.querys.forEach((element) => {
                                const queryToAdd = {
                                    query: element,
                                    list: this.config.listKey,
                                };
                                console.log(queryToAdd);
                                this.add(queryToAdd);
                            });
                        }
                    };
                    fileReader.readAsText(_event.target.files[i]);
                }
            }
        },
    },

    components: {},
};
</script>

<style scoped lang='postcss'>
.query-list-tool-bar {
}
.display-buttons-selected {
    display: flex;
}
.btn {
    @apply opacity-50 m-0;
}
.btn > .material-icons {
    @apply text-xl;
}
</style>
