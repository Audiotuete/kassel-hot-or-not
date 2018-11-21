<template>
  <div class='navbar'>
    <div class='menu-container'>
      <button
        class='menu-button'
        v-for='(userAnswer, index) in allUserAnswers' 
        :key=userAnswer.question.id
        @click='navigateToCard(userAnswer, index)'
      >
        <div :class="{'circle': true, 'question-answered': userAnswer.status, 'active': userAnswer.question.id === activeCardId }"/>
      </button>
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
  z-index: 500;
  display: flex;
  justify-content: center;
  position: absolute;
  height: 40px;
  width: 100vw;
  background: rgba(255,255,255,1);
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.25);
  padding-left: 1rem;
  padding-right: 1rem;
  box-sizing: border-box;
}
.menu-container {
  display: flex;
  width: 90vw;
  justify-content: space-around;
  align-items: center;
}

.menu-button {
  background: transparent;
  height: 1rem;
}

.circle {
  background: #E2E2E2;
  border-radius: 50%;
  width: 6px;
  height: 6px;
}

// .fa:hover {
//   color: #4A90E2;
// }

.question-answered {
  background: #7ED321
}

.active {
  background: #4A90E2;
  width: 8px;
  height: 8px;

}






</style>
