<template>
    <section
        class="query-list bg-purple-500 flex flex-col flex-grow p-4 my-4 overflow-hidden"
    >
        <button @click="add()" class="btn">
            <span class="material-icons"> add </span>
        </button>
        <button @click="remove()" class="btn">
            <span class="material-icons"> remove </span>
        </button>
        <div class="flex flex-col flex-grow overflow-y-scroll bg-pink-900">
            <div
                v-for="(item, index) in allQuerys"
                v-bind:key="index"
                class="flex mb-1 border-b border-gray-700"
                v-on:dblclick="select(item)"
            >
                <div class="key">{{ item.id }}</div>
                <div class="key">{{ item.resultKey }}</div>
                <div class="">=</div>
                <div class="result">{{ result(item) }}</div>
            </div>
        </div>
        <div class="bg-indigo-500 p-4 text-yellow-600">{{selected.id}}</div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
//import QueryItem from './QueryItem';
import { mapActions } from 'vuex';

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
        ...mapActions('FilterQuerys', ['add', 'remove','unselect', 'select', 'setInputData']),
    },

    components: {},
};
</script>

<style scoped lang='scss'>
.query-list {
}
</style>
