<template>
  <section class="query-list flex flex-col px-2 overflow-hidden mb-2">
    <div class="title">
      {{ config.listTitle }} 
      {{
        getQueryList(config.listKey).length
          ? "(" + getQueryList(config.listKey).length + ")"
          : ""
      }}
    </div>
    <ToolBar
      v-show="open"
      v-bind="$props"
    />
    <div
      v-show="open"
      class="list-container border-opacity-10 overflow-hidden h-full"
    >
      <div
        class="flex flex-col flex-grow overflow-y-scroll select-none h-full"
        @click="clickOutside($event)"
      >
        <div
          v-for="(item, index) in getQueryList(config.listKey)"
          :key="index"
          class="query-item flex px-2 border-b w-full border-gray-700"
          :class="{
            selected: selected(config.listKey).id === item.id,
            'text-yellow-400': item.type === 'query',
            'text-purple-400': item.type === 'value',
          }"
          @click="select({ query: item, list: config.listKey })"
          @dblclick="handleDblClick(config.listKey)"
        >
          <div class="key">
            {{ item.resultKey }}
          </div>
          <div
            v-show="item.description"
            class="description"
          >
            &nbsp;:&nbsp;{{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import ToolBar from "./Toolbar";

export default {
    name: "QueryList",
    props: ["config"],
    data() {
        return {};
    },
    mounted() {},
    computed: {
        open() {
            return this.config.open;
        },
        ...mapGetters("FilterQuerys", [
            "allQuerys",
            "getQueryList",
            "selected",
            "result",
            "inputData",
        ]),
    },
    methods: {
        toggleList() {
            this.config.open = !this.config.open;
        },
        clickOutside(_event) {
            const isOutside = !_event.target.closest(".query-item");
            if (isOutside) {
                this.unselect({ list: this.config.listKey });
            }
        },
        handleDblClick(_list) {
            console.log(_list);
            if (_list === "liveQuerys") {
                this.editSelected({ list: this.config.listKey });
            } else if (_list === "allQuerys") {
                this.add({ query: this.selected(_list), list: "liveQuerys" });
            }
        },
        ...mapActions("FilterQuerys", [
            "add",
            "remove",
            "unselect",
            "select",
            "editSelected",
            "removeAll",
        ]),
    },

    components: { ToolBar },
};
</script>

<style scoped lang='postcss'>
.query-list {
}
.selected {
    @apply bg-white bg-opacity-10;
}
.query-item:last-child {
    @apply mb-2;
}
</style>
