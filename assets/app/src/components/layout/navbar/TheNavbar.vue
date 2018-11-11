<template>
  <div class='navbar'>
    <div class='menu-container'>
      <button 
        v-for='(userAnswer, index) in allUserAnswers' 
        :key=userAnswer.id
        @click='navigateToCard(userAnswer, index)'
      >
        <i 
        :class="{'fa fa-circle': true, 'question-answered': userAnswer.status, 'active': userAnswer.id === activeCardId }"></i></button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'navbar',
  props: ['allUserAnswers', 'activeCardId'],
  data () {
    return {

    }
  },
  methods: {
    navigateToCard(userAnswer, index) {
      this.$emit('navigate', index)
    }
  }
}
</script>

<style lang='scss'>
.navbar {
  z-index: 1000;
  display: flex;
  justify-content: center;
  position: absolute;
  height: 7vh;
  width: 100%;
  background: rgba(255,255,255,1);
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.25);
}
.menu-container {
  width: 65vw;
  display: flex;
  padding-top: 1px;
  justify-content: space-around;
  align-items: center;
  line-height: 0;
}

.fa {
  color: #E2E2E2;
  font-size: 0.5rem;
}

// .fa:hover {
//   color: #4A90E2;
// }

.question-answered {
  color: #7ED321
}

.active {
  color: #4A90E2;
  font-size: 0.75rem;
  padding-top: 3px;
}






</style>
