
<script>
export default {
  name: 'base-heading',
  render: function(createElement) {
    return createElement(
      'h' + this.level,   // tag name
      this.$slots.default // array of children
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  h1, h2, h3, h4, h5, h6 {
    display: flex;
    text-align: center;
    justify-content: space-between;
    // align-items: center;
  }

  h1 {
    margin: 0 1rem 1rem 1rem;
    font-size: 1.1rem;
    font-weight: 300;
    width: 100%;
  }
  h2 {
    margin: 0 1rem 1rem 1rem;
    font-size: 1rem;
    font-weight: 600;
  }
  // h3 {
    
  // }
  // h4 {
    
  // }
  // h5 {
    
  // }
  // h6 {
  
  // }
</style>
