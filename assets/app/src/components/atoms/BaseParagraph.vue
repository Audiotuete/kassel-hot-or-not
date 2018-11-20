<template>
  <p class='paragraph'>
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'base-paragraph',
  // props: {
  //   size: {
  //     type: Number,
  //     required: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  .paragraph {
    margin: 0rem .5rem 0 .5rem;
    font-size: 0.8rem;
    text-align: center;
    color: #555555;
    line-height: 1.3;
    font-weight: 500;
  }
</style>


