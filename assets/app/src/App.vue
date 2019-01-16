
<template>
  <div 
    id='app'
  >
    <router-view v-if='deviceOrientation'></router-view>
    <!-- Shown when phone is in landscape mode -->
    <div v-else>Test</div>
  </div>
</template>

<script>
import { dictionary } from './validation.conf.js'
// import screenfull from 'screenfull'

export default {

  name: 'app',
  components: {},
  data () {
    return {
      allUsers: [],
      deviceOrientation: true
    }
  },
  methods: {
    changeOrientation() {
      if(Math.abs(window.orientation === 90)){ 
        this.deviceOrientation = false
      } else {
        this.deviceOrientation = true
      }
    },
  },
  created() {
    window.addEventListener('orientationchange', () => this.changeOrientation())
    this.$validator.localize('de', dictionary.de) 
  },

  destroyed() {
    window.removeEventListener('orientationchange', () => this.changeOrientation())
  },
  
}

</script>

<style lang='scss'>

.main-container{
  font-size: 1.1rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // box-sizing: border-box;
  // padding: 0 3vw  5vh 3vw;
}

html, body {
  position: fixed;
  overflow: hidden;
}

body {
  background-color: #ffffff;
  margin: 0;
  height: 100vh;
  width: 100vw;
  font-family: 'Open Sans';
  font-size: 2rem;

  a {
    color: #323232;
    cursor: default;
    text-decoration: none;
  } 

  button {
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
  }

  input, textarea {
    outline: none;
    border: none;
    resize: none;
  }
}

</style>
