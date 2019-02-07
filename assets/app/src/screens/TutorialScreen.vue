<template>
  <div class="main-container">
    <div v-if='this.$apollo.loading' class="loading"></div>
    <!-- <TheNavbar @navigate='goToCard($event)' :allUserAnswers=allUserAnswers :activeCardId=activeCardId /> -->
    <vue-swing
      @throwoutup='goToPoll()'
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
        <!-- <BaseHeading :level=2 class='tutorial-text'>
          Die Fragen können in vier verschiedene Richtungen gezogen (Swipe) werden…
        </BaseHeading>
        <div class='tutorial-graphic'>
          <div>
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
        </div>
        <div class='indicator-bar'>
          <div class='indicator-container'>
            <span :class="{'indicator-button': true, 'indicator-checked': this.tutorialCheck.left }"><i class='sl-icon icon-arrow-left-circle'/></span>
            <span :class="{'indicator-button': true, 'indicator-checked': this.tutorialCheck.right }"><i class='sl-icon icon-arrow-right-circle'/></span>
            <span :class="{'indicator-button': true, 'indicator-checked': this.tutorialCheck.up }"><i class='sl-icon icon-arrow-up-circle'/></span>
            <span :class="{'indicator-button': true, 'indicator-checked': this.tutorialCheck.down }"><i class='sl-icon icon-arrow-down-circle'/></span>
          </div>
        </div> -->
        <BaseParagraph style='margin: 1rem 0  1.5rem 0' :level=2>Manche Fragen nutzen Symbole,<br> die folgendes bedeuten:</BaseParagraph>
        <SymbolsLegend/>
        <BaseParagraph>Fragen können durch ein Wischen nach oben übersprungen werden.
        </BaseParagraph>
        <BaseHeading style='margin-top: 0.5rem; color: #4A90E2' :level=2>Wische nach oben, um zu starten!</BaseHeading>

      </div>
    </div>

    </vue-swing>

    <!-- <Modal 
    v-if='showSymbolModal'
    @close='showSymbolModal = false'
    >
      <SymbolsLegend/>
      <BaseButton style='margin: 0' @click='goToPoll()'>Ok</BaseButton>
    </Modal> -->
  </div>
</template>

<script>
import VueSwing from 'vue-swing'

import TheNavbar from '../components/layout/navbar/TheNavbar'
import Modal from '../components/templates/Modal'
import SymbolsLegend from '../components/pages/SymbolsLegend'

// GraphQL
import CREATE_USER from '../graphql/users/createUser.gql'

export default {
  name: 'tutorial-screen',
  components: { VueSwing, TheNavbar, Modal, SymbolsLegend },
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
        // Animated checkmark with cirular loader around it
        setTimeout(() => {
          this.showSymbolModal = true
          this.tutorialCheck = {left: false, right: false, up: false, down: false}
        }, 500)
      }

      let domElement = this.activeCardDomElement = document.querySelector('.tutorial-card')
      let card = this.$refs.vueswing.stack.getCard(domElement)
      card.throwIn(0, 0)
    },
    goToPoll() {
      this.$router.push('/umfrage')
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
    box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.15);

    &.card-left {
      z-index: 1030;
      top: 6rem;
      left: 2rem;
      transform: rotate(-11deg);
      justify-content: flex-start;
      align-items: center;
    }
    &.card-right {
      z-index: 1020;
      top: 6.5rem;
      left: 9rem;
      transform: rotate(11deg);
      justify-content: flex-end;
      align-items: center;
    }
    &.card-up {
      z-index: 1010;
      top: 2.5rem;
      left: 6rem;
      transform: rotate(7deg);
      justify-content: center;
      align-items: flex-start;
    }
    &.card-down {
      z-index: 1000;
      top: 10rem;
      left: 5.5rem;
      transform: rotate(-8deg);
      justify-content: center;
      align-items: flex-end;
    }
  }
}

.modal-heading {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;

  &__top-margin {
    margin-top: 1.5rem;
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
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;  
}

.tutorial-text {
  z-index: 1100;
  position: absolute;
  top: 14vh;
  // margin: auto;
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

.symbols-list-container-outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom:.5rem;

  .symbols-list-container-inner {
    display: flex;
    flex-direction: column;
    padding-right: 1.75rem;
  }
}

.symbols-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.75rem;

  &.check {
    margin-top: 0;
    color: rgba(125, 211, 33, 0.75)
  }

  &.close {
    color: rgba(208, 2, 26, .5)
  }

  &.note {
    padding-left: 2px;
    color: rgba(245, 165, 35, .6)
  }

  &.doc {
    padding-left: 9px;
    color: #629EE4
  }

  &.action-redo {
    padding-left: 8px;
    color: #4A4A4A;
  }

  .symbol-text {
    margin-left: 1rem;
    font-weight: 600;
  }

  .icon-check {
    font-size: 12.5vw;
  }
  .icon-close {
    font-size: 12.5vw;
  }
  .icon-note {
    font-size: 12vw;
  }
  .icon-doc {
    font-size: 12vw;
  }
  .icon-action-redo {
    font-size: 12vw;
    transform: rotate(16deg);
  }

  .rotation {
    transform: rotate(-22deg)
  }
}

.devider {
  margin-top: 1.25rem;
  width: 91%;
  border: 0.5px solid rgba(0, 0, 0, 0.05);
}








</style>
