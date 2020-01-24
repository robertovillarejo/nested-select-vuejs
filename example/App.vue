<template>
  <div id="app">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <h1 class="text-center">Nested Select Example</h1>
        <form>
          <nested-select
            :host="'https://jsonplaceholder.typicode.com'"
            :hierarchy="hierarchyModel"
            v-model="myModel"
            :required="requiredSelect"
            @complete="printPath($event)"
          >
            <template slot="0"
              >User</template
            >
            <template slot="1"
              >Album</template
            >
            <template slot="2"
              >Photo</template
            >
          </nested-select>
          <p></p>
          <button type="submit" class="btn btn-primary">Send</button>
        </form>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NestedSelectComponent } from "../src/index";

export default Vue.extend({
  data: function() {
    return {
      myModel: null,
      requiredSelect: true,
      hierarchyModel: [
        {
          path: "/users",
          prop: "id",
          label: "username"
        },
        {
          path: "/users/[id]/albums",
          prop: "id",
          label: "title"
        },
        {
          path: "/albums/[id]/photos",
          prop: "id",
          label: "title"
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
