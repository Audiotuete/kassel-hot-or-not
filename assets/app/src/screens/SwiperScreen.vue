<template>
  <div>
    <div v-if='this.$apollo.loading' class="loading"></div>
    <TheNavbar @navigate='goToCard($event)' :allUserAnswers=allUserAnswers :activeCardId=activeCardId />
    <vue-swing
      @throwoutup='skipQuestion()'
      @throwoutleft='throwOutLeft()'
      @throwoutdown='flipCard()'
      @throwoutright='throwOutRight()'
      @dragmove='dragmove($event)'
      @dragstart='throwOutEvent.throwOutConfidence = 0'
      @dragend='throwOutEvent.throwOutConfidence = 0'
      :config='config'
      ref='vueswing'
      class='swing-wrapper'
    >
      <div class='placeholder-card'></div>
        <Card
          v-for='card in cardStack'
          :class='["card-" + card.question.id ]'
          :key='card.question.id'
          @cardrequest='requestNewCard()'
          @flip='flipCard()'
          ref='basecard'
          :card='card' 
          :showCardBack='showCardBack'
          :throwOutEvent='throwOutEvent'
        />
    </vue-swing>
    
    <Modal 
    v-if='showSuccessModal' 
    @close='showSuccessModal = false' 
    >
      <div v-if='!mailAddressSend' class='end-modal'>
        <span class='end-modal-heading' v-show='!inputIsFocused' >
          Geschafft !
        </span>
        <i v-if='!emailInputIsFocused' class='end-modal-icon sl-icon icon-diamond'></i>
        <div v-if='!emailInputIsFocused' class='end-modal-counter'><span class='counter-done'>{{allUserAnswers.length}}</span>  von <span class='counter-open'>{{allUserAnswers.length}}</span> Fragen beantwortet</div>
        <BaseParagraph>Trage hier deine eMail-Adresse ein, um am Gewinnspiel für Fahrkarten im Wert von bis zu 30€ teilzunehmen.</BaseParagraph>
        <BaseInput 
          class='end-modal-input'
          v-model='successMailAddress'
          @focus='focus()'
          @blur='emailInputIsFocused = false'
          :label='"Gewinnspiel-Mail-Adresse"'
          :validation="{'hasError': errors.has('Eingabe') }"
          v-validate='{ required: true, email: true }'
          data-vv-delay="1200"
          type='email' 
          name='Eingabe'/>
        <BaseInputError v-show="errors.has('Eingabe')">{{ errors.first('Eingabe') }}</BaseInputError>
        <div class='end-modal-privacy'>Deine Adresse wird nicht weitergegeben oder zu Werbezwecken genutzt</div>
      </div>
      <BaseButton v-if='!mailAddressSend' @click='sendMailAddress()'>Abschicken</BaseButton>

      <div v-if='mailAddressSend' class='mail-verification-popup'>
        <span class='end-modal-heading'>Mailadresse bestätigen</span>
        <BaseParagraph>
            Du hast Post von uns!<br>
            Ja, super umständlich, aber leider gesetztlich vorgeschrieben.<br>
            ¯\_(ツ)_/¯
        </BaseParagraph>
        <div class='mail-verification-popup-icon'><i class='sl-icon icon-envelope-letter'></i></div>
      </div>
      <BaseButton v-if='mailAddressSend' @click='showSuccessModal = false'>Ok</BaseButton>
    </Modal>

    <Modal 
    v-if='showMissingModal' 
    @close='showMissingModal = false' 
    >
      <span class='end-modal-heading end-modal-heading__top-margin' v-show='!inputIsFocused' >
        Super! Du bist am Ende der Umfrage angekommen.
      </span>      
      <BaseParagraph>Um am Gewinnspiel teilzunehmen zu können, musst du allerdings alle Fragen beantwortet. :)</BaseParagraph>
      <div class='end-modal-counter'>Du hast schon <br><span class='counter-done'>{{pendingQuestions}}</span>  von <span class='counter-open'>{{allUserAnswers.length}}</span> Fragen beantwortet</div>
      <BaseParagraph>Schau einfach im Fortschrittsbalken, welche dir noch fehlen.</BaseParagraph>
      <TheNavbar class='end-modal-navbar' @navigate='goToCard($event)' :allUserAnswers=allUserAnswers :activeCardId=activeCardId />
      <div>
        <div class='end-modal-indicator-container'>
          <div class='end-modal-indicator open'/><BaseParagraph>noch offen</BaseParagraph>
        </div>
        <div class='end-modal-indicator-container'>
          <div class='end-modal-indicator answerd'/><BaseParagraph>beantwortet</BaseParagraph>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import VueSwing from 'vue-swing'

import TheNavbar from '../components/layout/navbar/TheNavbar'
import Card from '../components/templates/Card'
import Modal from '../components/templates/Modal'

// GraphQL
import ALL_USER_ANSWERS from '../graphql/userAnswers/allUserAnswers.gql'
import CREATE_USER from '../graphql/users/createUser.gql'
import GET_TOKEN from '../graphql/auth/getToken.gql'

export default {
  name: 'swiper-screen',
  components: { VueSwing, TheNavbar, Card, Modal },
  data () {
    return {
      allUserAnswers: null,
      activeCardDomElement: '',
      throwOutEvent: {throwDirection: '', throwOutConfidence: 0},
      nextCardIndex: 0,
      cardStack: [{id: 'prevent-undefined-error'}],
      showCardBack: false,
      showSuccessModal: false,
      showMissingModal: false,
      emailInputIsFocused: false,
      pendingQuestions: 0,
      successMailAddress: '',
      mailAddressSend: false,
    }
  },
  apollo: {
    allUserAnswers: {
      query: ALL_USER_ANSWERS,
      fetchPolicy: 'network-only',
      update(data) {
        this.showCardBack = false
        this.inputIsFocused = false
        this.allUserAnswers = data.allUserAnswers
        this.cardStack.unshift(this.allUserAnswers[this.nextCardIndex])
        this.cardStack.pop()
        this.nextCardIndex += 1
        return data.allUserAnswers
      }
    }
  },
  computed: {
    activeCardId() {
      return this.cardStack[0].question.id
    },
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
    focus() {
      this.emailInputIsFocused = true
      setTimeout(() => window.scrollTo(0, 0), 400)    
    },
    dragmove(event) {
      // let confidence = (event.throwOutConfidence).toFixed(1) 
      // this.throwOutEvent = {throwDirection: event.throwDirection, throwOutConfidence: confidence}
      this.throwOutEvent = event
    },
    throwOutRight() {
      this.$refs.basecard[0].throwOutRight()
    },
    throwOutLeft() {
      this.$refs.basecard[0].throwOutLeft()
    },
    flipCard() {
      let domElement = this.activeCardDomElement = document.querySelector('.card-' + this.cardStack[0].question.id)
      let card = this.$refs.vueswing.stack.getCard(domElement)
      card.throwIn(0, 0)
      this.showCardBack = !this.showCardBack
    },
    skipQuestion() {
      if (this.nextCardIndex >= this.allUserAnswers.length ) {
        this.nextCardIndex = 0 
      }
      this.$apollo.queries.allUserAnswers.refetch()
    },
    requestNewCard() {
      this.mailAddressSend = false

      let counter = 0
      let missingIndexes = []
      if (this.nextCardIndex >= this.allUserAnswers.length ) {
        this.nextCardIndex = 0
        this.$apollo.queries.allUserAnswers.refetch().then(data => {
        data.data.allUserAnswers.forEach((userAnswer, index) => {
          if (userAnswer.status === true) {
            counter += 1
          } else {
            this.nextCardIndex = 0
          }
        })
        if (counter === this.allUserAnswers.length) {
          this.pendingQuestions = counter
          this.showSuccessModal = true
        } else {
          this.pendingQuestions = counter
          this.showMissingModal = true
        }
        })
      } else {
        this.$apollo.queries.allUserAnswers.refetch().then(data => {
          data.data.allUserAnswers.forEach((userAnswer) => {
          if (userAnswer.status === true) {
            counter += 1
          }
        })
        if (counter === this.allUserAnswers.length) {
          this.pendingQuestions = counter
          this.showSuccessModal = true
        }
        })
      }
    },
    goToCard(index) {
      this.showCardBack = false

      this.cardStack.unshift(this.allUserAnswers[index])
      this.cardStack.pop()
      this.nextCardIndex = index + 1
    },
    sendMailAddress() {
      this.$validator.validateAll().then((result) => {
        if(!result) {
          return false
        } else {
          this.mailAddressSend = true
        }
      })
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

.placeholder-card {
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
}

.loading {
  top: 0;
  position: absolute;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.25);
}


.end-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.end-modal-heading {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;

  &__top-margin {
    margin-top: 1.5rem;
  }
}
.end-modal-icon {
  font-size: 5rem;
  color: #F8D11C;
}

.end-modal-counter {
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  width: 70%;
  text-align: center;

  .counter-done {
    color: #7ED321
  }
  .counter-open {
    color: #4A90E2;
  }
}
.end-modal-input {
  width: 80% !important;
}
.end-modal-privacy {
  font-size: 0.65rem;
  text-align: center;
  line-height: 1;
  width: 80%
}

.end-modal-navbar {
  width: 80vw !important;
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
  border-radius: 4px;
}

.end-modal-indicator-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.25rem;
}

.end-modal-indicator {
  border-radius: 50%;
  width: 12px;
  height: 12px;

  &.open {
    background: #E2E2E2;

  }
  &.answerd {
    background: #7ED321
  }
}

.mail-verification-popup {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.5rem 1rem 1rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    box-sizing: border-box;
    background: #fff;
    height: 8.8rem;
    box-shadow: 0 0px 5px 0 #7ED321;
    border-radius: 4px;

  .mail-verification-popup-icon {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    opacity: 0.2;
    color: #7ED321;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

}



</style>
