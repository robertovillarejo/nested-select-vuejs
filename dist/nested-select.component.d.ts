import { Vue } from "vue-property-decorator";
export default class NestedSelectComponent extends Vue {
    selects: Array<any>;
    dummy: boolean;
    readonly host: string;
    readonly context: string;
    readonly hierarchy: Array<any>;
    readonly required: boolean;
    mounted(): void;
    getChildren(depth: number, selected: any | undefined): void;
    fixUrl(path: string, selected: any): string;
    selectChanged(value: any, selectIndex: number): void;
    private getPath;
}
