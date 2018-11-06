
<template>
  <div>
    <YesOrNoCard
      class='card'
      v-if='card.__typename === "UserAnswerYesOrNoType"'
      @flip='flipCard()'
      @cardrequest='requestNewCard()'
      ref='typecard'
      :card = card
      :showCardBack = showCardBack
    />
    <MultipleCard
      class='card'
      v-if='card.__typename === "UserAnswerMultipleType"'
      @flip='flipCard()'
      @cardrequest='requestNewCard()'
      ref='typecard'
      :card = card
      :showCardBack = showCardBack
    />
  </div>

</template>

<script>
import YesOrNoCard from './YesOrNoCard'
import MultipleCard from './MultipleCard'

// GraphQL
// update YesOrNoCard

export default {
  name: 'yes-or-no-card',
  props: ['card', 'showCardBack'],
  components: { YesOrNoCard, MultipleCard },
  data () {
    return {}
  },
  methods: {
    throwOutRight() {
      this.$refs.typecard.throwOutRight()
    },
    throwOutLeft() {
      this.$refs.typecard.throwOutLeft()
    },

    flipCard() {
      this.$emit('flip')
    },
    requestNewCard() {
      this.$emit('cardrequest')      
    }
  },
}
</script>

<style scoped lang='scss'>

.card {
  z-index: 50;
  top: 11.5vh;
  position: relative;
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
