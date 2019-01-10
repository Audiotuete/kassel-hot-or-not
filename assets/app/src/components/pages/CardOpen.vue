
<template>
  <div>
    <div v-show='!showCardBack' class='question-container'>
      <CardQuestionContainer :card=card />
      <div class='question-navigation'>
        <BaseButton @click='flipCard()'>Frage beantworten</BaseButton>
      </div>
    </div>
    <!-- Back of Card where a note can be made an send (not dragable) -->
    <div v-show='showCardBack' class='backside-container'>
      <BaseHeading :level=1 v-show='!inputIsFocused'>
        <button class='backside-header-icon' @click='flipCard()'><i class='sl-icon icon-arrow-left'></i></button>
        Deine Meinung:
        <span class='placeholder-for-space-between' style='width: 1rem'></span>
      </BaseHeading>
      <BaseHeading :level=2 v-show='!inputIsFocused' class='backside-question'>{{card.question.questionText}}</BaseHeading>
      <BaseInputError v-show="errors.has('Meinung')">{{ errors.first('Meinung') }}</BaseInputError>
      <BaseTextarea
        :validation="{'hasError': errors.has('Meinung') }"
        v-model='answerText' 
        v-validate='{ required: true, min: 5 }'
        data-vv-delay="1200"
        @focus='focus()' 
        type='text' 
        name='Meinung' 
        />
      <div class='note-show-question' v-show='inputIsFocused' @click='inputIsFocused = false'><i class='sl-icon icon-arrow-up note-show-question-icon'></i></div>
      <BaseButton @click='sendAnswer(answerText)' class='button-offset'>Senden</BaseButton>
    </div>

  </div>

</template>

<script>

import CardQuestionContainer from '../molecules/CardQuesitonContainer'
// GraphQL
import UPDATE_USER_ANSWER_OPEN from '../../graphql/userAnswers/updateUserAnswerOpen.gql'

export default {
  name: 'card-open',
  props: ['card', 'showCardBack', 'throwOutEvent'],
  components: {
    CardQuestionContainer
  },
  data () {
    return {
      answerText: this.card.answerText,
      inputIsFocused: false,
    }
  },
  methods: {

    throwOutRight() {
      this.flipCard()
    },
    throwOutLeft() {
      this.flipCard()
    },

    sendAnswer() {
      this.$validator.validateAll().then((result) => {
        if(!result) {
          return false
        } else {
          this.saveCardAnswer(this.answerText)
        }
      })
    },
    flipCard() {
      this.$emit('flip')
    },

    saveCardAnswer(answer = -1) {
      const questionId = this.card.question.id

      this.$apollo.mutate({
        mutation: UPDATE_USER_ANSWER_OPEN,
        variables: {
          questionId: questionId,
          answerText: answer,
        }
      }).then(() => {
        this.$emit('cardrequest') 
      }).catch((error) => {
        // Error
        console.error(error)
      })
    },
    focus() {
      this.inputIsFocused = true
      setTimeout(() => window.scrollTo(0, 0), 400)
      
    },
  }
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

  .note-show-question {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 3vh;
    left: 5vw;
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

.button-offset {
  margin-top: -1.6rem !important;
}

</style>
