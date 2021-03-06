import { __extends, __decorate } from 'tslib';
import axios from 'axios';
import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

var NestedSelectComponent =
/** @class */
function (_super) {
  __extends(NestedSelectComponent, _super);

  function NestedSelectComponent() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.selects = [];
    _this.dummy = false; //used for force rendering

    return _this;
  }

  NestedSelectComponent.prototype.mounted = function () {
    this.getChildren(0);
  };

  NestedSelectComponent.prototype.getChildren = function (depth, selected) {
    var vm = this;
    var currentNode = vm.hierarchy[depth];

    if (currentNode.path) {
      var fixedPath = this.fixUrl(currentNode.path, selected);
      var url = vm.host + vm.context + fixedPath;
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
  };

  NestedSelectComponent.prototype.fixUrl = function (path, selected) {
    return path.replace("[id]", selected);
  };

  NestedSelectComponent.prototype.selectChanged = function (value, selectIndex) {
    if (selectIndex === this.hierarchy.length - 1) {
      this.$emit("input", value);
      this.$emit("complete", this.getPath());
    } else {
      this.$emit('input', null);
      this.selects = this.selects.slice(0, selectIndex + 1);
      var schema = this.hierarchy[selectIndex];
      this.getChildren(selectIndex + 1, value[schema.prop]);
    }
  };

  NestedSelectComponent.prototype.getPath = function () {
    var parents = [];

    for (var i = 0; i < this.selects.length; i++) {
      var current = this.selects[i];
      parents.push(current.selected);
    }

    return parents;
  };

  __decorate([Prop({
    required: false,
    default: {},
    type: Object
  })], NestedSelectComponent.prototype, "value", void 0);

  __decorate([Prop({
    type: String,
    default: ""
  })], NestedSelectComponent.prototype, "host", void 0);

  __decorate([Prop({
    type: String,
    default: ""
  })], NestedSelectComponent.prototype, "context", void 0);

  __decorate([Prop({
    type: Array,
    required: true
  })], NestedSelectComponent.prototype, "hierarchy", void 0);

  __decorate([Prop({
    type: Boolean,
    default: true
  })], NestedSelectComponent.prototype, "required", void 0);

  NestedSelectComponent = __decorate([Component], NestedSelectComponent);
  return NestedSelectComponent;
}(Vue);

/* script */
var __vue_script__ = NestedSelectComponent;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    key: _vm.dummy,
    staticClass: "form-group",
    on: {
      "submit": function submit($event) {
        $event.preventDefault();
      }
    }
  }, _vm._l(_vm.selects, function (select, selectIndex) {
    return _c('div', {
      key: selectIndex
    }, [_c('label', {
      staticClass: "form-control-label",
      attrs: {
        "for": 'nested-select-' + selectIndex
      }
    }, [_vm._t(selectIndex)], 2), _vm._v(" "), _c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: select.selected,
        expression: "select.selected"
      }],
      staticClass: "form-control",
      attrs: {
        "name": 'nested-select-' + selectIndex,
        "id": 'nested-select-' + selectIndex,
        "required": _vm.required
      },
      on: {
        "change": [function ($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });

          _vm.$set(select, "selected", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
        }, function ($event) {
          return _vm.selectChanged(select.selected, selectIndex);
        }]
      }
    }, _vm._l(select.options, function (option, optionIndex) {
      return _c('option', {
        key: optionIndex,
        domProps: {
          "value": option
        }
      }, [_vm._v(_vm._s(option[select.label]))]);
    }), 0)]);
  }), 0);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* component normalizer */

function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "NestedSelectComponent.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */

/* style inject SSR */


var NestedSelectComponent$1 = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

var index = {
  install: function install(Vue, options) {
    Vue.component('nested-select', NestedSelectComponent$1);
  }
};

export default index;
export { NestedSelectComponent$1 as NestedSelectComponent };
//# sourceMappingURL=index.module.js.map
