<template>
  <div>
    <label>{{ label }}</label>
    <select @input="updateValue" v-bind="$attrs">
      <option
        v-for="option in options"
        :value="value"
        :key="option"
        :selected="option === value"
      >{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: [String]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped></style>
