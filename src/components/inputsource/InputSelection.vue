<template>
    <div
        class="inset-0 absolute bg-gray-700 bg-opacity-90 flex justify-center items-center z-30"
        v-show="false"
    >
        <div class="bg-gray-800 flex flex-col justify-between w-full h-full">
            <select
                class="block w-96 mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-600 bg-gray-800"
            >
                <option value="api">Dummy Data API's</option>
                <option value="file">From local File</option>
                <option value="text">Paste Input as Text</option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "input-selection",
    props: [],
    mounted() {},
    data() {
        return {};
    },
    methods: {
        ...mapActions([]),
        toggle() {}
    },
    computed: {
        ...mapGetters([]),
        isOpen: {
            get() {
                const width = this.$props.paneWidth;
                let result = width > 0 ? true : false;
                result = this.$props.invertIcon ? !result : result;
                return result;
            },
            set(value) {
                return value;
            }
        }
    }
};
</script>

<style scoped lang="postcss">
</style>
 