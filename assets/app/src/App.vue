
<template>
  <div 
    id='app'
  >
    <DesktopWarning v-if='!isMobile'><BaseButton style='width: 16rem' @click='openMobileWindow()'>Mobile Ansicht öffnen</BaseButton></DesktopWarning>
    <router-view v-else id='router-view' v-show='isPortrait'></router-view>
    <!-- Shown when phone is in landscape mode -->
    <LandscapeWarning v-show='!isPortrait'></LandscapeWarning>
  </div>
</template>

<script>
import LandscapeWarning from './components/pages/LandscapeWarning'
import DesktopWarning from './components/pages/DesktopWarning'

import { dictionary } from './validation.conf.js'
// import screenfull from 'screenfull'

export default {

  name: 'app',
  components: {LandscapeWarning, DesktopWarning},
  data () {
    return {
      allUsers: [],
      isPortrait: true,
      isMobile: false,
    }
  },
  methods: {
    checkWindow() {
      if(Math.abs(window.orientation) === 90) {
        this.isPortrait = false
      } else {
        this.isPortrait = true
      }
    },
    openMobileWindow() {
      window.open(window.location.href, "", "width=400, height=720") // Opens a new window
    }
  },
  created() {
    window.addEventListener('orientationchange', () => this.checkWindow(), false)
    window.addEventListener("resize", () => this.checkWindow(), false)
    
    this.$validator.localize('de', dictionary.de)

    if(navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      || window.innerWidth < 1024) {
        console.log("true")
        this.isMobile = true
      }
    // else if( navigator.userAgent.match(/Windows/i) 
    //   || navigator.userAgent.match(/X11/i)
    //   || navigator.userAgent.match(/Macintosh/i)
    //   || navigator.userAgent.match(/Mac/i)
    //   || navigator.userAgent.match(/Ubuntu/i)
    //   || navigator.userAgent.match(/CrOS/i)) {
    //     console.log("false")
    //     this.isMobile = false
    //   }
  },

  destroyed() {
    window.removeEventListener('orientationchange', () => this.checkWindow(), false)
    window.removeEventListener("resize", () => this.checkWindow(), false) 
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
  scroll-behavior: smooth;
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
@media only screen 
and (min-width : 1025px) {
  #router-view {
    display: none
  }
}

</style>
