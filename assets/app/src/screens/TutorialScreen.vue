<template>
  <div class="main-container">
    <div v-if='this.$apollo.loading' class="loading"></div>
    <!-- <TheNavbar @navigate='goToCard($event)' :allUserAnswers=allUserAnswers :activeCardId=activeCardId /> -->
    <vue-swing
      @throwoutup='throwout()'
      @throwoutleft='throwout()'
      @throwoutdown='throwout()'
      @throwoutright='throwout()'
      @dragmove='dragmove($event)'
      :config='config'
      ref='vueswing'
      class='swing-wrapper'
    >

    <div class='card'></div>

    <div class='card tutorial-card'>
      <div class='tutorial-container'>
        <div class='tutorial-graphic'>
          <div class='card card__small card-left'>
            <span :class="{'indicator-button indicator-button__small': true, 'indicator-checked': this.tutorialCheck.left }"><i class='sl-icon icon-arrow-left-circle'></i></span>
          </div>
          <div class='card card__small card-right'>
            <span :class="{'indicator-button indicator-button__small': true, 'indicator-checked': this.tutorialCheck.right }"><i class='sl-icon icon-arrow-right-circle'></i></span>
          </div>
          <div class='card card__small card-up'>
            <span :class="{'indicator-button indicator-button__small': true, 'indicator-checked': this.tutorialCheck.up }"><i class='sl-icon icon-arrow-up-circle'></i></span>
          </div>
          <div class='card card__small card-down'>
            <span :class="{'indicator-button indicator-button__small': true, 'indicator-checked': this.tutorialCheck.down }"><i class='sl-icon icon-arrow-down-circle'></i></span>
          </div>


        </div>
      <div class='indicator-bar'>
        <div class='indicator-container'>
          <span :class="{'indicator-button': true, 'indicator-checked': this.tutorialCheck.left }"><i class='sl-icon icon-arrow-left-circle'></i></span>
          <span :class="{'indicator-button': true, 'indicator-checked': this.tutorialCheck.right }"><i class='sl-icon icon-arrow-right-circle'></i></span>
          <span :class="{'indicator-button': true, 'indicator-checked': this.tutorialCheck.up }"><i class='sl-icon icon-arrow-up-circle'></i></span>
          <span :class="{'indicator-button': true, 'indicator-checked': this.tutorialCheck.down }"><i class='sl-icon icon-arrow-down-circle'></i></span>
        </div>
      </div>
      </div>
    </div>

    </vue-swing>

    <Modal 
    v-if='showSymbolModal'
    @close='showSymbolModal = false'
    >
      <span class='end-modal-heading end-modal-heading__top-margin' >
        Symbole
      </span>      
    </Modal>
  </div>
</template>

<script>
import VueSwing from 'vue-swing'

import TheNavbar from '../components/layout/navbar/TheNavbar'
import Modal from '../components/templates/Modal'

// GraphQL
import CREATE_USER from '../graphql/users/createUser.gql'

export default {
  name: 'tutorial-screen',
  components: { VueSwing, TheNavbar, Modal },
  data () {
    return {
      activeCardDomElement: '',
      throwOutEvent: {throwDirection: '', throwOutConfidence: 0},
      nextCardIndex: 0,
      card: {id: 0},
      showSymbolModal: false,
      tutorialCheck: {left: false, right: false, up: false, down: false}

    }
  },

  computed: {
    config () {
      return {        
        allowedDirections: 
        [
          VueSwing.Direction.UP,
          VueSwing.Direction.DOWN,
          VueSwing.Direction.RIGHT,
          VueSwing.Direction.LEFT,
        ],
        minThrowOutDistance: 1000,
        maxThrowOutDistance: 5000,
        throwOutConfidence: (xOffset, yOffset, element) => {
          const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth * 1.5, 1);
          const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight * 2.5, 1);
          return Math.max(xConfidence, yConfidence);
        }
      }
    }
  },
  methods: {
    dragmove(event) {
      this.throwOutEvent = event
      
    },
    throwout() {
      let key = false
      let checkPassed = true

      switch(this.throwOutEvent.throwDirection.toString()) {
        case 'Symbol(LEFT)':
          this.tutorialCheck.left = true
          break
        case 'Symbol(RIGHT)':
          this.tutorialCheck.right = true
          break
        case 'Symbol(UP)':
          this.tutorialCheck.up = true
          break
        case 'Symbol(DOWN)':
          this.tutorialCheck.down = true         
        }
      for (key in this.tutorialCheck) {
        if (!this.tutorialCheck[key]) {
          checkPassed = false
        }
      }
      if (checkPassed) {
        this.showSymbolModal = true
        this.tutorialCheck = {left: false, right: false, up: false, down: false}
      }

      let domElement = this.activeCardDomElement = document.querySelector('.tutorial-card')
      let card = this.$refs.vueswing.stack.getCard(domElement)
      card.throwIn(0, 0)
    }
  },

}
</script>

<style scoped lang='scss'>

.swing-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-bottom: 150%;
}

.card {
  z-index: 0;
  top: 10vh;
  position: absolute;
  height: 74vh;
  width: 88vw;
  display: flex;
  justify-content: center;
  align-items: center;  
  background-color: #fff;
  border-radius: 1.5vh;
  box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;

  &__small {
    height: 25vh;
    width: 33vw;
    border-radius: 4px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);

    &.card-left {
      z-index: 1030;
      top: 7rem;
      left: 2rem;
      transform: rotate(-11deg);
      justify-content: flex-start;
      align-items: center;
    }
    &.card-right {
      z-index: 1020;
      top: 7.5rem;
      left: 9rem;
      transform: rotate(11deg);
      justify-content: flex-end;
      align-items: center;
    }
    &.card-up {
      z-index: 1010;
      top: 3.5rem;
      left: 6rem;
      transform: rotate(7deg);
      justify-content: center;
      align-items: flex-start;
    }
    &.card-down {
      z-index: 1000;
      top: 11rem;
      left: 5.5rem;
      transform: rotate(-8deg);
      justify-content: center;
      align-items: flex-end;
    }
  }
}

.loading {
  top: 0;
  position: absolute;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.25);
}

.tutorial-container {
  z-index: 50;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
}

.tutorial-graphic {
  position: relative;
  background-repeat: no-repeat;
  background-size: auto;
  background-attachment: fixed;
  background-position: center; 
  display: flex;
  width: 100%;
  flex: 4;
  justify-content: center;
  align-items: center;
}

.indicator-bar {
  display: flex;
  width: 100%;
  flex: 1;
  align-self: flex-end;
  justify-content: center;
  height: 16vh;
  background: rgba(255,255,255,1);
  // box-shadow: 0 0 6px 0 rgba(0,0,0,0.25);
}

.indicator-container {
  width: 100%;
  display: flex;
  padding-top: 1px;
  margin: 0 .75rem;
  justify-content: space-around;
  align-items: center;
  background: transparent;
}

.indicator-text {
  font-size: 1rem;
  width: 30vw;
  text-align: center;
}

.indicator-button {
  font-size: 14.5vw;
  color: #CDCDCD;

  &__small {
    margin: 0.4rem;
    font-size: 8vw;
    color: rgba(74, 145, 226, 0.5);
  }
}

.indicator-checked {
  color: #7ED321;
}






</style>
