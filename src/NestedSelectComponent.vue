<template>
  <div class="form-group" @submit.prevent="" :key="dummy">
    <div v-for="(select, selectIndex) in selects" v-bind:key="selectIndex">
      <label
        class="form-control-label"
        v-bind:for="'nested-select-' + selectIndex"
        >{{ select.selectLabel }}</label
      >
      <select
        class="form-control"
        v-bind:name="'nested-select-' + selectIndex"
        v-bind:id="'nested-select-' + selectIndex"
        v-model="select.selected"
        @change="
          selectChanged(select.options[select.selected - 1], selectIndex)
        "
        :required="required"
      >
        <option
          v-for="(option, optionIndex) in select.options"
          v-bind:key="optionIndex"
          v-bind:value="option[select.prop]"
          >{{ option[select.label] }}</option
        >
      </select>
    </div>
  </div>
</template>

<script lang="ts" src="./nested-select.component.ts"></script>
