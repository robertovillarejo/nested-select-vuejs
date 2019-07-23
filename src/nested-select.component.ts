import axios from "axios";
import Component from "vue-class-component";
import { Vue, Prop } from "vue-property-decorator";

@Component
export default class NestedSelectComponent extends Vue {

    selects: Array<any> = [];

    dummy = false;  //used for force rendering

    @Prop({ type: String, default: "" })
    readonly host!: string;

    @Prop({ type: String, default: "/api" })
    readonly context!: string;

    @Prop({ type: Array, required: true })
    readonly hierarchy!: Array<any>;

    @Prop({ type: Boolean, default: true })
    readonly required!: boolean;

    mounted() {
        this.getChildren(0, undefined);
    }

    getChildren(depth: number, selected: any | undefined): void {
        var vm = this;
        var currentNode = vm.hierarchy[depth];
        if (currentNode.path) {
            const fixedPath = this.fixUrl(currentNode.path, selected);
            const url = vm.host + vm.context + fixedPath;
            axios.get(url).then(function (res) {
                if (vm.selects.length == 0) {
                    vm.selects = new Array(1);
                }
                vm.selects[depth] = {
                    options: res.data || new Array(res),
                    prop: currentNode.prop,
                    label: currentNode.label,
                    selectLabel: currentNode.selectLabel
                };
                vm.dummy = !vm.dummy;
            });
        }
    }

    fixUrl(path: string, selected: any): string {
        return path.replace("[id]", selected);
    }

    selectChanged(value: any, selectIndex: number): void {
        if (selectIndex === this.hierarchy.length - 1) {
            this.$emit("input", value);
        } else {
            this.selects = this.selects.slice(0, selectIndex + 1);
            let schema = this.hierarchy[selectIndex];
            this.getChildren(selectIndex + 1, value[schema.prop]);
        }
    }

}