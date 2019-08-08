# Nested Select HTML tags for VueJS
A VueJS component for rendering nested _select HTML tags_ based on a hierarchy model

## Getting started
Check this [link](https://conacyt-arquitectura.github.io/npm/configuracion-cliente-npm) for configuring your npm client for private repository.

To install with npm use `npm i @conacyt/nested-select`  
To install with yarn use `yarn add @conacyt/nested-select`

## Usage
```html
<div id="app">
    <nested-select
            :host="'https://jsonplaceholder.typicode.com'"
            :hierarchy="hierarchyModel"
            v-model="myModel"
            :required="requiredSelect">
    </nested-select>
</div>
```

```typescript
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
  components: { "nested-select": NestedSelectComponent }
});
```

## Development
For development with Hot Replace Module use `npm run serve` for serving the `example` folder.

### Building
Use `npm run build` to produce the distribution files in `dist` folder.