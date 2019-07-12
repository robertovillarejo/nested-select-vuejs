import axios from '../../node_modules/axios/dist/axios';

export default {
  name: 'nested-select',
  components: {},
  props: {
    host: {
      type: String,
      default: ''
    },
    context: {
      type: String,
      default: '/api'
    },
    enable: {
      type: Boolean,
      default: true
    },
    hierarchymodel: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selects: []
    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
    this.getChildren(0);
  },
  methods: {
    getChildren: function (depth, selected) {
      var vi = this;
      var currentNode = vi.hierarchymodel[depth];
      if (currentNode.path) {
        const fixedPath = this.fixUrl(currentNode.path, selected);
        const url = vi.host + vi.context + fixedPath;
        axios.get(url).then(function (res) {
          if (vi.selects.length == 0) {
            vi.selects = new Array(1);
          }
          vi.selects[depth] = {
            options: res.data || new Array(res),
            prop: currentNode.prop,
            label: currentNode.label
          };
        });
      }
    },
    selectChanged: function (value, selectIndex) {
      if (selectIndex !== this.hierarchymodel.length - 1) {
        //this.selects = this.selects.slice(0, selectIndex + 1);
        this.getChildren(selectIndex + 1, value);
      }
    },
    fixUrl: function (path, selected) {
      return path.replace('{selected}', selected);
    }
  }
}