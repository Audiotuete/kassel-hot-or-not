
<template>
  <div>
    <div v-show='!showCardBack' class='question-container'>
      <CardQuestionContainer :card=card />
      <div class='question-navigation'>
        <BaseButton @click='flipCard()'>Auswahl treffen</BaseButton>
      </div>
    </div>
    <!-- Back of Card where a note can be made an send (not dragable) -->
    <div v-show='showCardBack' class='backside-container'>
      <BaseHeading :level=1 v-show='!inputIsFocused' >
        <button class='backside-header-icon' @click='flipCard()'><i class='sl-icon icon-arrow-left'></i></button>
        Anmerkungen zu:
        <span class='placeholder-for-space-between' style='width: 1rem'></span>
      </BaseHeading>
      <BaseHeading :level=2 v-show='!inputIsFocused' >{{card.question.questionText}}</BaseHeading>
      <form class='choice-form' @submit.prevent='makeChoice()'>
        
        <label :class="{'choice-form-option': true, 'choice-form-option__active': currentChoice == index }" v-for='(option, index) in options' :key=index :for=option>
          <input type="radio" :id=option name="choice" :value=index v-model='currentChoice'>
          {{option}}
        </label> 
        <BaseButton>Senden</BaseButton>
      </form>
    </div>
  </div>

</template>

<script>

import CardQuestionContainer from '../molecules/CardQuesitonContainer'
// GraphQL
import UPDATE_USER_ANSWER_MULTIPLE from '../../graphql/userAnswers/updateUserAnswerMultiple.gql'

export default {
  name: 'card-multiple',
  props: ['card', 'showCardBack'],
  components: {
    CardQuestionContainer
  },
  data () {
    return {
      currentChoice: this.card.answerChoiceKey,
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

      this.$apollo.mutate({
        mutation: UPDATE_USER_ANSWER_MULTIPLE,
        variables: {
          questionId: questionId,
          answerChoiceKey: choice,
        }
      }).then(() => {
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
    position: relative;
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

  .backside-header-icon {
    // position: absolute;
    // left: 3vw;
    // top: 4.5vh;
    width: 1rem;
    font-size: 1.25rem;
    color: #555555;
  }

  .choice-form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .choice-form-option {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.5rem;
      background: #fafafa;
      height: 2.5rem;
      width: 70vw;
      font-weight: 500;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);

      &__active {
        color: #7ED321;
        box-shadow: 0 0 4px 0 #B6E484;
        border: 1px solid #B6E484
      }

      input {
        display: none;
      }
    }
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
  .overlay {
    opacity: .5;
    background-color: black;
    position: absolute;
    left: 0; top: 0; height: 100%; width: 100%;
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


</style>
