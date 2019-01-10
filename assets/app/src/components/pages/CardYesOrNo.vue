
<template>
  <div>
    <div v-show='!showCardBack' class='question-container'>
      <CardQuestionContainer :card=card />
      <div class='choicebar'>
        <div class='choice-container'>
          <button @click='vote(answerValues.NO)' class='choice-button'><i class='sl-icon icon-close'></i></button>
          <button v-show='!showCardBack' @click='flipCard()' class='choice-button'><i class='sl-icon icon-note'></i></button>
          <!-- <button v-show='showCardBack' @click='toggleCard()' class='choice-button' href='#'><i class='sl-icon icon-question'></i></button> -->
          <button @click='vote(answerValues.YES)' class='choice-button'><i class='sl-icon icon-check'></i></button>
        </div>
      </div>
    </div>
    <!-- Back of Card where a note can be made an send (not dragable) -->
    <div v-show='showCardBack' class='backside-container'>
      <BaseHeading :level=1 v-show='!inputIsFocused'>
        <button class='backside-header-icon' @click='flipCard()'><i class='sl-icon icon-arrow-left'></i></button>
        Anmerkungen zu:
        <span class='placeholder-for-space-between' style='width: 1rem'></span>
      </BaseHeading>
      <BaseHeading :level=2 v-show='!inputIsFocused'>{{card.question.questionText}}</BaseHeading>
      <BaseInputError v-show="errors.has('Anmerkung')">{{ errors.first('Anmerkung') }}</BaseInputError>
      <BaseTextarea
        :validation="{'hasError': errors.has('Anmerkung') }"
        v-model='answerNote' 
        v-validate='{ required: true, min: 5 }'
        data-vv-delay="1200"
        @focus='focus()' 
        type='text' 
        name='Anmerkung' 
        />
      <div class='note-show-question' v-show='inputIsFocused' @click='inputIsFocused = false'><i class='sl-icon icon-arrow-up note-show-question-icon'></i></div>
      <BaseButton @click='makeNote(answerValues.NOTE, answerNote)' class='button-offset'>Senden</BaseButton>
    </div>

  </div>

</template>

<script>

import CardQuestionContainer from '../molecules/CardQuesitonContainer'
// GraphQL
import UPDATE_USER_ANSWER_YES_OR_NO from '../../graphql/userAnswers/updateUserAnswerYesOrNo.gql'

export default {
  name: 'card-yes-or-no',
  props: ['card', 'showCardBack', 'throwOutEvent'],
  components: {
    CardQuestionContainer
  },
  data () {
    return {
      answerValues: {'NO': 0, 'YES': 1, 'NOTE': 2},
      answerNote: this.card.answerNote,
      inputIsFocused: false,
    }
  },
  computed: {
  },
  methods: {

    throwOutRight() {
      this.vote(this.answerValues.YES)
    },
    throwOutLeft() {
      this.vote(this.answerValues.NO)
    },

    vote(value = -1) {
      this.saveCardAnswer(value, '')
    },
    makeNote(value = -1, note = '') {
      this.$validator.validateAll().then((result) => {
        if(!result) {
          return false
        } else {
          this.saveCardAnswer(value, note)
        }
      })
    },
    flipCard() {
      this.$emit('flip')
    },

    saveCardAnswer(value, note) {
      const questionId = this.card.question.id

      this.$apollo.mutate({
        mutation: UPDATE_USER_ANSWER_YES_OR_NO,
        variables: {
          questionId: questionId,
          answerValue: value,
          answerNote: note,
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


.choicebar {
  display: flex;
  width: 100%;
  flex: 1;
  align-self: flex-end;
  justify-content: center;
  height: 16vh;
  background: rgba(255,255,255,1);
  // box-shadow: 0 0 6px 0 rgba(0,0,0,0.25);
}

.choice-container {
  width: 100%;
  display: flex;
  padding-top: 1px;
  justify-content: space-around;
  align-items: center;
  background: transparent;
}

.choice-text {
  font-size: 1rem;
  width: 30vw;
  text-align: center;
}

.choice-button {

  .icon-close {
    font-size: 12.5vw;
    color: rgba(208, 2, 26, .5)
  }
  .icon-note, .icon-question {
    font-size: 12vw;
    color: rgba(245, 165, 35, .6)
  }
  .icon-check {
    font-size: 12.5vw;
    color: rgba(125, 211, 33, 0.75)
  }
}

.button-offset {
  margin-top: -1.6rem !important;
}


</style>
