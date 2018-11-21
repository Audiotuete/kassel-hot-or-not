
<template>
  <div
    id='app'
    @click='enterFullscreen()'
  >
    <!-- <router-view name='header'></router-view> -->
    <router-view></router-view>
    <!-- <router-view name='footer'></router-view> -->
    <!-- <div v-for='user in allUsers' :key=user.id>
      {{user.username}}
    </div> -->
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
      allUsers: []
    }
  },
  methods: {
    enterFullscreen () {
      // if (screenfull.enabled && screenfull.isFullscreen == false ) {
      //   screenfull.request()
      // }
    }
  },
  created() {
    this.$validator.localize('de', dictionary.de) 
  }
}

</script>

<style lang='scss'>

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
  }

  input, textarea {
    outline: none;
    border: none;
    resize: none;
  }
}

</style>
