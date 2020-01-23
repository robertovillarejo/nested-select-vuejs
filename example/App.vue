<template>
  <div id="app">
    <div>
      <h1>Nested Select Example</h1>
      <form>
        <div class="form-group">
          <nested-select
            :host="'http://localhost:3000'"
            :hierarchy="hierarchyModel"
            v-model="myModel"
            :required="requiredSelect"
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
          path: "/clasificaciones",
          prop: "id",
          label: "nombre",
          selectLabel: "clasificaciones: "
        },
        {
          path: "/clasificaciones/[id]/peliculas",
          prop: "id",
          label: "nombre",
          selectLabel: "peliculas: "
        }
      ]
    };
  },
  components: { "nested-select": NestedSelectComponent }
});
</script>
