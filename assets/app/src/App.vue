
<template>
  <div 
    id='app'
  >
    <router-view v-if='isPortrait'></router-view>
    <!-- Shown when phone is in landscape mode -->
    <LandscapeWarning v-else></LandscapeWarning>
  </div>
</template>

<script>
import LandscapeWarning from './components/pages/LandscapeWarning'

import { dictionary } from './validation.conf.js'
// import screenfull from 'screenfull'

export default {

  name: 'app',
  components: {LandscapeWarning},
  data () {
    return {
      allUsers: [],
      isPortrait: true,
    }
  },
  methods: {
    checkOrientation() {
        if(Math.abs(window.orientation) === 90) {
          this.isPortrait = false
        } else {
          this.isPortrait = true
        }
    }
  },
  created() {
    window.addEventListener('orientationchange', () => this.checkOrientation(), false)
    window.addEventListener("resize", () => this.checkOrientation(), false)
    
    this.$validator.localize('de', dictionary.de) 
  },

  destroyed() {
    window.removeEventListener('orientationchange', () => this.checkOrientation(), false)
    window.removeEventListener("resize", () => this.checkOrientation(), false) 
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
