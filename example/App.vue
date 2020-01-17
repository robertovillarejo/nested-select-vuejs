<template>
  <div id="app">
    <div>
      <h1>Nested Select Example</h1>
      <form>
        <div class="form-group">
          <nested-select
            :host="'https://jsonplaceholder.typicode.com'"
            :hierarchy="hierarchyModel"
            v-model="myModel"
            :required="requiredSelect"
            @complete="printPath($event)"
          ></nested-select>
        </div>
        <p></p>
        <button type="submit" class="btn btn-primary">Send</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import NestedSelectComponent from "../src/NestedSelectComponent.vue";

export default Vue.extend({
  data: function() {
    return {
      myModel: undefined,
      requiredSelect: true,
      hierarchyModel: [
        {
          path: "/users",
          prop: "id",
          label: "username",
          selectLabel: "User: "
        },
        {
          path: "/users/[id]/albums",
          prop: "id",
          label: "title",
          selectLabel: "Album: "
        },
        {
          path: "/albums/[id]/photos",
          prop: "id",
          label: "title",
          selectLabel: "Photo: "
        }
      ]
    };
  },
  methods: {
    printPath: function(path: Array<any>) {
      console.log(path);
    }
  },
  components: { "nested-select": NestedSelectComponent }
});
</script>
