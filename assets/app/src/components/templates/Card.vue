
<template>
  <div>
    <CardYesOrNo
      class='card'
      v-if='card.__typename === "UserAnswerYesOrNoType"'
      @flip='flipCard()'
      @cardrequest='requestNewCard()'
      ref='typecard'
      :card = card
      :showCardBack = showCardBack
    />
    <CardMultiple
      class='card'
      v-if='card.__typename === "UserAnswerMultipleType"'
      @flip='flipCard()'
      @cardrequest='requestNewCard()'
      ref='typecard'
      :card = card
      :showCardBack = showCardBack
    />
    <CardOpen
      class='card'
      v-if='card.__typename === "UserAnswerOpenType"'
      @flip='flipCard()'
      @cardrequest='requestNewCard()'
      ref='typecard'
      :card = card
      :showCardBack = showCardBack
    />
  </div>
</template>

<script>
import CardYesOrNo from '../pages/CardYesOrNo'
import CardMultiple from '../pages/CardMultiple'
import CardOpen from '../pages/CardOpen'


// GraphQL
// update CardYesOrNo

export default {
  name: 'yes-or-no-card',
  props: ['card', 'showCardBack'],
  components: { CardYesOrNo, CardMultiple, CardOpen },
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
