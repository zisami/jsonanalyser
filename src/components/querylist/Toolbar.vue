<template>
    <section
        class="query-list-tool-bar border-opacity-20 border-gray-100 border-b flex py-1 px-2 select-none"
    >
        <div class="buttons-allways flex content-center mr-4">
            <button
                @click="add({ query: {}, list: config.listKey })"
                class="btn"
            >
                <span class="material-icons"> note_add </span>
            </button>
        </div>
        <div
            class="buttons-selected hidden"
            :class="{ 'display-buttons-selected': selected(config.listKey).id }"
        >
            <button @click="editSelected({ list: config.listKey })" class="btn">
                <span class="material-icons icon"> settings </span>
            </button>
            <button @click="exportSelectedQuery(config.listKey)" class="btn">
                <span class="material-icons icon"> get_app </span>
            </button>
            <button
                @click="removeSelected({ list: config.listKey })"
                class="btn"
            >
                <span class="material-icons"> delete </span>
            </button>
        </div>
        <div class="buttons-list-actions ml-auto flex">
            <button
                @click="exportList(config.listKey)"
                class="btn"
                title="Query Liste exportieren"
            >
                <span class="material-icons"> save_alt </span>
            </button>
            <button
                @click.prevent="openImportList()"
                class="btn"
                title="Query Liste importieren"
            >
                <span class="material-icons"> upgrade </span>
            </button>
            <input
                @change="handleFiles"
                type="file"
                :id="'listImport' + config.listKey"
                multiple
                accept="application/JSON"
                style="display: none"
            />
            <button
                @click="listResults()"
                class="btn"
                title="run all querys in list"
            >
                <span class="material-icons"> playlist_play </span>
            </button>
            <button
                @dblclick="removeAll(config.listKey)"
                class="btn"
                title="double click to clear list"
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
    name: "query-list-tool-bar",
    props: ["config"],
    mounted() {},
    data() {
        return {};
    },
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
