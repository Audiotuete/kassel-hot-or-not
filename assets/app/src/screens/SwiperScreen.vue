<template>
  <div>
    <div v-if='this.$apollo.loading' class="loading"></div>
    <TheNavbar @navigate='goToCard($event)' :allUserAnswers=allUserAnswers :activeCardId=activeCardId />
    <vue-swing
      @throwoutup='skipQuestion()'
      @throwoutleft='throwOutLeft()'
      @throwoutdown='toggleCard()'
      @throwoutright='throwOutRight()'
      @change='this.activeCardDomElement = document.querySelector(".cardselector")'
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
          @flip='toggleCard()'
          ref='basecard'
          :card='card' 
          :showCardBack='showCardBack'
        />
    </vue-swing>
  </div>
</template>

<script>
import VueSwing from 'vue-swing'

import TheNavbar from '../components/layout/navbar/TheNavbar'
import Card from '../components/templates/Card'

// GraphQL
import ALL_USER_ANSWERS from '../graphql/userAnswers/allUserAnswers.gql'
import CREATE_USER from '../graphql/users/createUser.gql'
import GET_TOKEN from '../graphql/auth/getToken.gql'

export default {
  name: 'swiper-screen',
  components: { VueSwing, TheNavbar, Card },
  data () {
    return {
      allUserAnswers: null,
      activeCardDomElement: '',
      nextCardIndex: 0,
      cardStack: [{id: 'prevent-undefined-error'}],
      showCardBack: false,
    }
  },
  apollo: {
    allUserAnswers: {
      query: ALL_USER_ANSWERS,
      fetchPolicy: 'network-only',
      update(data) {
        this.cardStack = []
        this.showCardBack = false
        this.inputIsFocused = false
        // this.nextCardIndex = 0
        this.allUserAnswers = data.allUserAnswers
        this.cardStack.unshift(this.allUserAnswers[this.nextCardIndex])
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
    throwOutRight() {
      this.$refs.basecard[0].throwOutRight()
    },
    throwOutLeft() {
      this.$refs.basecard[0].throwOutLeft()
    },
    toggleCard() {
      let card = this.$refs.vueswing.stack.getCard(this.activeCardDomElement)
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

      if (this.nextCardIndex >= this.allUserAnswers.length ) {
        this.nextCardIndex = 0
        this.$apollo.queries.allUserAnswers.refetch()

      } else {
        this.$apollo.queries.allUserAnswers.refetch()
      }
 
    },
    goToCard(index) {
      this.showCardBack = false

      this.cardStack = []
      this.cardStack.unshift(this.allUserAnswers[index])
      this.nextCardIndex = index + 1
    }
  },
  updated() {
    if (this.cardStack) {
      this.activeCardDomElement = document.querySelector('.card-' + this.cardStack[0].question.id)
    }
  },
}
</script>

<style scoped lang='scss'>

.swing-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 150%;
}

.placeholder-card {
  z-index: 0;
  top: 11.5vh;
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
  background: rgba(0, 0, 0, 0.5);
}

</style>
