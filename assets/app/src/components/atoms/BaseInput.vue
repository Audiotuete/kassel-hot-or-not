<template>
  <label class="input-container">
  <span>{{ label }}</span>
    <input
      :class="{input: true, 'form-error-field': this.hasValidationError }"
      v-bind="$attrs"
      v-bind:value="value"
      v-on="eventListeners"
    >
  </label>
</template>

<script>
export default {
  name: 'base-input',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    validation: {
      type: Object,
      required: false
    }
  },
  computed: {
    hasValidationError() {
      if (this.validation) {
        return this.validation.hasError
      }
    },
    eventListeners () {
      var vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign({},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: function (event) {
            vm.$emit('input', event.target.value)
          },
          keyup: function (event) {
            vm.$emit('keyup', event.target.value)
          },
          focused: function (event) {
            vm.$emit('focused', event.target.value)
          }
        }
      )
    }
  },
}
</script>

<style lang="scss" scoped>

  .input-container {
    align-self: center;
    text-align: center;
    font-size: 0.70rem;
    margin-top: 0.5rem;
    // margin-bottom: 0.1rem;
    width: 100%;
  }

  .input {
    // pointer-events: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 2.5rem;
    margin-bottom: 0.2rem;
    font-size: 0.9rem;
    font-weight: 300;
    // padding-left: 0.75rem;
    font-family: 'Open Sans';
    box-sizing: border-box;
    background: #FEFEFE;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: inset 0 0 6px rgba(0,0,0,0.25);
    border-radius: 0.75vw;

    &::placeholder {
      color: #DDDDDD;
    }

  }

  .form-error-field {
    border: 1px solid #E94F35;
  }



</style>
