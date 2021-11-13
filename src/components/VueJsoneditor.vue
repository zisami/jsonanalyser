<template lang="html">
  <div
    class="jsoneditor-container"
    :class="{'max-box':max,'min-box':!max}"
    :style="getHeight"
  >
    <div
      ref="jsoneditor"
      class="jsoneditor-box"
    />
  </div>
</template>

<script>
import JSONEditor from "jsoneditor/dist/jsoneditor-minimalist.min.js";
import "jsoneditor/dist/jsoneditor.min.css";
import { mapActions } from "vuex";
//import store from "../store";
export default {
    name: "VJsoneditor",
    props: {
        value: [Object, Array, Number, String, Boolean],
        height: {
            type: String,
        },
        plus: {
            type: Boolean,
            default: true,
        },
        optionType: {
            type: String,
            default: "output",
        },
    },
    data() {
        return {
            editor: null,
            style: {},
            max: false,
            internalChange: false,
        };
    },
    methods: {
        ...mapActions("FilterQuerys", ["add", "setInputData", "listResults"]),
        onChange() {
            let error = null;
            let json = {};
            try {
                json = this.editor.get();
            } catch (err) {
                error = err;
            }
            if (error) {
                this.$emit("error", error);
            } else {
                if (this.editor) {
                    this.internalChange = true;
                    this.$emit("input", json);
                    this.$nextTick(() => {
                        this.internalChange = false;
                    });
                }
            }
            this.options.onChange && this.options.onChange(...arguments);
        },
        initView() {
            if (!this.editor) {
                var container = this.$refs.jsoneditor;
                let cacheChange = this.options.onChange;
                delete this.options.onChange;
                const options = Object.assign(this.options, {
                    onChange: this.onChange,
                });
                this.editor = new JSONEditor(container, options);
                this.options.onChange = cacheChange;
            }
            this.editor.update(this.value || {});
        },
        destroyView() {
            if (this.editor) {
                this.editor.destroy();
                this.editor = null;
            }
        },
        onClick(node, event) {
            if (event.type === "click") {
                if (Date.now() - this.lastClick < 250) {
                    let path = prettyPrintPath(node.path);
                    console.log("node.path", node.path);
                    console.log("prettyPrintPath", path, typeof path);
                    let resultName = `data${path[0] !== "[" ? "." : ""}${path}`;
                    let query = `return data${
                        path[0] !== "[" ? "." : ""
                    }${path}`;

                    this.lastClick = Date.now();
                    let newQuery = {
                        resultKey: resultName,
                        queryString: query,
                        type: "value",
                        edit: false
                    };

                    this.add({ query: newQuery });
                }
                this.lastClick = Date.now();
            }
            function prettyPrintPath(pathArray) {
                let str = "";
                for (let i = 0; i < pathArray.length; i++) {
                    const element = pathArray[i];
                    if (
                        typeof element === "number" ||
                        !isNaN(parseInt(element))
                    ) {
                        str += "[" + element + "]";
                    } else {
                        if (str.length > 0) str += ".";
                        str += element;
                    }
                }
                return str;
            }
        },
    },
    computed: {
        options() {
            if (this.optionType === "output") {
                return {
                    mode: "view",
                    sortObjectKeys: true,
                    navigationBar: false,
                    name: "Output",
                    onError: function (err) {
                        alert(err.toString());
                    },
                };
            } else {
              return {
                mode: "view",
                sortObjectKeys: true,
                navigationBar: false,
                name: "Input",
                onError: function (err) {
                    alert(err.toString());
                },
                onEvent: this.onClick,
            };
            }
            
        },
        getHeight() {
            if (this.height && !this.max) {
                return {
                    height: this.height,
                };
            }
            return {};
        },
    },
    watch: {
        value: {
            handler(value) {
                if (this.editor && value && !this.internalChange) {
                    this.editor.update(value);
                }
            },
            deep: true,
        },
        max() {
            this.$nextTick(() => {
                this.initView();
            });
        },
    },
    mounted() {
        this.initView();
    },
    beforeDestroy() {
        this.destroyView();
    },
};
</script>

<style lang="css" scoped>
.jsoneditor-container.max-box {
    @apply bg-gray-800;
    position: fixed;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
}

.jsoneditor-container.min-box {
    position: relative;
    min-width: 300px;
    width: 100%;
}

.jsoneditor-box {
    height: 100%;
}

.jsoneditor-container:hover .max-btn {
    display: block;
}

.max-btn {
    display: none;
    position: absolute;
    top: 7px;
    left: 110px;
    color: #fff;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0) url(../assets/images/plus.svg) no-repeat;
    background-position: 3px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 3px;
}
.max-btn:hover {
    border: 1px solid #d7e6fe;
}
</style>
