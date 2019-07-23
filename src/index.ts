import NestedSelectComponent from "./NestedSelectComponent.vue";

export default {
  install(Vue: any, options: any) {
    Vue.component('nested-select', NestedSelectComponent);
  }
}

export { NestedSelectComponent };