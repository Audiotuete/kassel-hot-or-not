
<template>
  <div>
    <div v-show='!showCardBack' class='question-container'>
      <div class='question-image-text'>
        <img src='https://source.unsplash.com/random/450x650' alt=''>
      </div>
      <div class='question-navigation'>
        <button @click='flipCard()' class='nav-button'>Zur Auswahl</button>
      </div>
    </div>
    <!-- Back of Card where a note can be made an send (not dragable) -->
    <div v-show='showCardBack' class='backside-container'>
      <div v-show='!inputIsFocused' class='backside-header'><button class='backside-header-icon' @click='flipCard()'><i class='sl-icon icon-arrow-left'></i></button>Anmerkungen zu:</div>
      <div v-show='!inputIsFocused' class='backside-question'>Sollten in der Kantine vegetarische Speisen angeboten werden?</div>
      <form @submit.prevent='makeChoice()'>
        
        <div v-for='(option, index) in options' :key=index :for=option>
          <input type="radio" :id=option name="choice" :value=index v-model='currentChoice'>
          {{option}}
        </div> 
        <button class='nav-button'>Senden</button>
      </form>
    </div>

  </div>

</template>

<script>

// GraphQL
import UPDATE_USER_ANSWER_MULTIPLE from '../../graphql/userAnswers/updateUserAnswerMultiple.gql'

export default {
  name: 'multiple-card',
  props: ['card', 'showCardBack'],
  data () {
    return {
      currentChoice: '',
      inputIsFocused: false,
    }
  },
  computed: {
    options() {
      return JSON.parse(this.card.question.options.replace(/'/g, '"'))
    }
  },
  methods: {

    throwOutRight() {
      this.flipCard()
    },
    throwOutLeft() {
      this.flipCard()
    },

    makeChoice() {
      this.saveCardAnswer(this.currentChoice)
    },
    flipCard() {
      this.$emit('flip')
    },

    saveCardAnswer(choice = -1) {
      const questionId = this.card.question.id

      console.log(questionId)
      console.log(choice)

      this.$apollo.mutate({
        mutation: UPDATE_USER_ANSWER_MULTIPLE,
        variables: {
          questionId: questionId,
          answerChoiceKey: choice,
        }
      }).then((data) => {

        console.log('MUTATION: Multiple')

        this.$emit('cardrequest') 
      }).catch((error) => {
        // Error
        console.error(error)
      })
    }
  },
}
</script>

<style scoped lang='scss'>

  .question-container {
    z-index: 50;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
  }
  
  .question-image-text {
    height: 10%;
    flex: 4;
  }

  .backside-container {
    z-index: 50;
    font-size: 1rem;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    box-sizing: border-box;
    padding: 5vh 3vw  5vh 3vw;
  }

  .backside-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 1rem 1rem 1rem;
    font-size: 1.2rem;
    font-weight: 300;
  }

  .backside-header-icon {
    position: absolute;
    left: 3vw;
    top: 8.5vh;
    font-size: 1.5rem;
    color: #555555;
  }

  .backside-question {
    margin: 0rem 1.75rem 0 1.75rem;
    font-size: 1.1rem;
    text-align: center;
    color: #555555;
    line-height: 1.3;
    font-weight: 500;
  }

  .note-show-question {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 7vh;
    right: 6vw;
    height: 10vw;
    width: 10vw;
    background: #fff;
    color: #629EE4;
    border-radius: 50%;
    border: 1px solid #629EE4;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
  }

  .note-choice-button {
    pointer-events: all;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 55%;
    width: 86%;
    margin-top: 1.5rem;
    padding: 2.5rem 1.5rem;
    font-size: 0.9rem;
    font-family: 'Open Sans';
    box-sizing: border-box;
    background: #FEFEFE;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.25);
    border-radius: 0.75vw;
  }

.question-image-text {
  height: 10%;
  flex: 4;
}

.question-navigation {
  display: flex;
  width: 100%;
  flex: 1;
  align-self: flex-end;
  justify-content: center;
  height: 16vh;
  background: rgba(255,255,255,1);
  // box-shadow: 0 0 6px 0 rgba(0,0,0,0.25);
}

.nav-button {
  background: #4A90E2;
  border: none;
  outline: none;
  width: 60vw;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 1vh;
  margin-top: 1rem;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.25);
}


</style>
