//External COmponents
import { mapGetters } from "vuex";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import VJsoneditor from "v-jsoneditor";

//Internal Components
import ToogleSplitPane from "./ToogleSplitPane";
import QueryList from "./querylist/QueryList";
import Input from "../assets/js/inputJson";

export default {
    name: "UiSplitter",
    data: function () {
        return {
            lastJsonData: {},
            inputEditor: {
                options: {
                    mode: "view",
                    sortObjectKeys: true,
                    navigationBar: false,
                    name: "issueData",
                    onError: function (err) {
                        alert(err.toString());
                    },
                },
            },
            outputEditor: {
                options: {
                    mode: "view",
                    sortObjectKeys: true,
                    navigationBar: false,
                    name: "issueData",
                },
                json: {
                    string: "string",
                    number: 123456,
                    boolean: true,
                    empty: "",
                    array: ["a", "b", 1, true],
                    object: {
                        string: "string",
                        number: 123456,
                        boolean: false,
                        empty: "",
                        array: ["a", "b", 1, true],
                    },
                    object2: {
                        string: "string",
                        number: 123456,
                        boolean: false,
                        empty: "",
                        array: ["a", "b", 1, true],
                    },
                    __wasanderes: {
                        string: "string",
                        number: 123456,
                        boolean: false,
                        empty: "",
                        array: ["a", "b", 1, true],
                    },
                },
            },
        };
    },
    computed: {
        ...mapGetters([
            "inputPaneSize",
            "outputPaneSize",
            "filterPaneSize",
            "editorsPaneSize",
        ]),
    },
    watch: {
        lastJsonData: () => {
            return Input.lastJsonData;
        },
    },
    created() {
        this.loadPlaceholderJson();
    },
    methods: {
        loadPlaceholderJson() {
            console.log("Getting Test Json");
            fetch("https://jsonplaceholder.typicode.com/todos/")
                .then((response) => response.json())
                .then((json) => {
                    this.lastJsonData = json;
                    return json;
                })
                .then((json) => {
                    console.log("result:", json);
                });
            console.log(this.lastJsonData);
        },
        saveEditorsSize() {
            console.log("?!!??");
        },
        onError() {
            console.log("error");
        },
    },
    components: { Splitpanes, Pane, ToogleSplitPane, VJsoneditor, QueryList },
};