<template>
  <div>
    <vue-swing
      @throwoutup='skipQuestion()'
      @throwoutleft='throwOutLeft()'
      @throwoutdown='toggleCard()'
      @throwoutright='throwOutRight()'
      @change='this.activeCard = document.querySelector(".cardselector")'
      :config='config'
      ref='vueswing'
      class='swing-wrapper'
    >
      <div class='placeholder-card'>
      </div>
      <div
        v-for='card in cardStack'
        :class='[ "card-" + card.id]'
        :key='card.id'
      >
        <Card
          @cardrequest='requestNewCard()'
          @flip='toggleCard()'
          ref='basecard'
          :card='card' 
          :showCardBack='showCardBack'
        />
      </div>
    </vue-swing>
  </div>
</template>

<script>
import VueSwing from 'vue-swing'
import Card from '../components/cards/Card'

// GraphQL
import ALL_USER_ANSWERS from '../graphql/userAnswers/allUserAnswers.gql'
import CREATE_USER from '../graphql/users/createUser.gql'
import GET_TOKEN from '../graphql/auth/getToken.gql'

export default {
  name: 'swiper-screen',
  components: { VueSwing, Card },
  data () {
    return {
      allUserAnswers: null,
      activeCard: '',
      nextCardIndex: 0,
      cardStack: [],
      showCardBack: false,
    }
  },
  apollo: {
    allUserAnswers: {
      query: ALL_USER_ANSWERS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        this.allUserAnswers = data.allUserAnswers
        this.cardStack.unshift(this.allUserAnswers[this.nextCardIndex])
        this.nextCardIndex += 1
        return data.allUserAnswers
      }
    }
  },
  computed: {
    config () {
      return {        
        allowedDirections: 
        [
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
    throwOutRight() {
      this.$refs.basecard[0].throwOutRight()
    },
    throwOutLeft() {
      this.$refs.basecard[0].throwOutLeft()
    },
    toggleCard() {
      let card = this.$refs.vueswing.stack.getCard(this.activeCard)
      card.throwIn(0, 0)
      this.showCardBack = !this.showCardBack
    },
    skipQuestion() {},
    requestNewCard() {
      // Query here
      if(this.cardStack.length == 1) {
        this.cardStack.pop()
      }
      this.showCardBack = false
      this.inputIsFocused = false;
      
      if (this.nextCardIndex >= this.allUserAnswers.length ) {
        this.nextCardIndex = 0
        console.log('route to endscreen')
        this.cardStack.unshift(this.allUserAnswers[this.nextCardIndex])
      } else {
        this.cardStack.unshift(this.allUserAnswers[this.nextCardIndex])
        this.nextCardIndex += 1
      }

      // this.cardStack.unshift({id: Math.floor(Math.random() * Math.floor(100)), value: Math.floor(Math.random() * Math.floor(20000))})
    },
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

</style>
