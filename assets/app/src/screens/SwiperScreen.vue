
<template>
  <div>
    <vue-swing
      @throwoutup='skipQuestion()'
      @throwoutleft='vote(answerValues.NO)'
      @throwoutdown='toggleCard()'
      @throwoutright='vote(answerValues.YES)'
      @change='this.activeCard = document.querySelector(".cardselector")'
      :config='config'
      ref='vueswing'
      class='swing-wrapper'
    >
      <div class='card card-not-dragable'>
        <div v-show='!showCardBack' class='question-container'>
          <div class='question-image-text'>
          </div>
        </div>
      </div>
      <div
        v-for='card in cardStack'
        :class='[ "card-" + card.id]'
        :key='card.id'
        >
        <YesOrNoCard :card='card' :showCardBack='showCardBack'/>
      </div>
    </vue-swing>
  </div>
</template>

<script>
import VueSwing from 'vue-swing'
import YesOrNoCard from '../components/cards/YesOrNoCard'

// GraphQL
import ALL_USER_ANSWERS from '../graphql/userAnswers/allUserAnswers.gql'
import CREATE_USER from '../graphql/users/createUser.gql'
import GET_TOKEN from '../graphql/auth/getToken.gql'

export default {
  name: 'swiper-screen',
  components: { VueSwing, YesOrNoCard },
  data () {
    return {
      allUserAnswers: {},
      activeCard: '',
      cardStack: [ 
        {id: 0, value: 'A'}
      ],
      none: 'none',
      answerValues: {'NO': 0, 'YES': 1, 'NOTE': 2},
      isPlaying: false,
      showCardBack: false,
      inputIsFocused: false,
    }
  },
  apollo: {
    allUserAnswers: {
      query: ALL_USER_ANSWERS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        console.log(data)
      },
    }
  },
  computed: {
    // username() {
    //   return 'Alfred'
    // },
    // password() {
    //   return 'password'
    // },
    config () {
      return {        
        allowedDirections: 
        [
          // Skip Question on swipe UP
          // VueSwing.Direction.UP,
          VueSwing.Direction.DOWN,
          VueSwing.Direction.RIGHT,
          VueSwing.Direction.LEFT,
        ]
        ,
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
    vote(value = -1) {
      this.saveCardAnswer(value, null)
    },
    toggleCard() { 
      let card = this.$refs.vueswing.stack.getCard(this.activeCard)
      card.throwIn(0, 0)
      this.showCardBack = !this.showCardBack
    },
    makeNote(value = -1, note = null) {

      this.saveCardAnswer(value, note)
    },
    skipQuestion() {},
    requestNewCard() {
      // Query here
      this.showCardBack = false
      this.inputIsFocused = false;
      this.cardStack.unshift({id: Math.floor(Math.random() * Math.floor(100)), value: Math.floor(Math.random() * Math.floor(20000))})
    },

    saveCardAnswer(value, note) {
      // Mutation here
      if(this.cardStack.length == 1) {
        this.cardStack.pop()

      }
      this.requestNewCard()
      // console.log(this.cardStack)
      // console.log(this.activeCard)

    }
  },
  mounted() {
    this.activeCard = document.querySelector('.card-' + this.cardStack[0].id)
  },
  updated() {
    this.activeCard = document.querySelector('.card-' + this.cardStack[0].id)
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


</style>
