<template>
    <section
        class="query-list bg-purple-500 flex flex-col flex-grow p-2 my-4 overflow-hidden"
    >
        <ToolBar> </ToolBar>
        <div class="flex flex-col flex-grow overflow-y-scroll p-2 bg-pink-900 select-none">
            <div
                v-for="(item, index) in allQuerys"
                v-bind:key="index"
                class="flex mb-1 border-b border-gray-700 space-x-4"
                :class="{ selected: selected.id === item.id }"
                v-on:dblclick="select(item)"
            >
                <div class="key">{{ item.id }}</div>
                <div class="key">{{ item.resultKey }}</div>
                <div class="">=</div>
                <div class="result">{{ result(item) }}</div>
            </div>
        </div>
        <div class="bg-indigo-900 p-4">{{ selected.id }}</div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import ToolBar from './Toolbar';

export default {
    name: 'query-list',
    props: [],
    mounted() {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters('FilterQuerys', [
            'allQuerys',
            'selected',
            'result',
            'inputData',
        ]),
    },
    methods: {
        ...mapActions('FilterQuerys', [
            'add',
            'remove',
            'unselect',
            'select',
            'setInputData',
        ]),
    },

    components: { ToolBar },
};
</script>

<style scoped lang='scss'>
.query-list {

    .selected {
        @apply ring ;
    }
}
</style>
