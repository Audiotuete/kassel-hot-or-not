
<template>
  <div>    
    <div 
      v-if='throwOutEvent.throwDirection.toString() === "Symbol(RIGHT)" && throwOutEvent.throwOutConfidence >= 1' 
      class='throwout-overlay-container right'>
      <div
        class='throwout-icon-container right'
        :style='{opacity: 1}'>
        <i class='throwout-icon sl-icon icon-check right'></i>
      </div>
    </div>
    <div 
      v-if='throwOutEvent.throwDirection.toString() === "Symbol(LEFT)" && throwOutEvent.throwOutConfidence >= 1' 
      class='throwout-overlay-container left'>
      <div
        class='throwout-icon-container left'
        :style='{opacity: 1}'>
        <i class='throwout-icon sl-icon icon-close left'></i>
      </div>
    </div>
    <CardYesOrNo
      class='card'
      v-if='card.__typename === "UserAnswerYesOrNoType"'
      @flip='flipCard()'
      @cardrequest='requestNewCard()'
      ref='typecard'
      :card='card'
      :showCardBack='showCardBack'
      :throwOutEvent='throwOutEvent'
    />
    <CardMultiple
      class='card'
      v-if='card.__typename === "UserAnswerMultipleType"'
      @flip='flipCard()'
      @cardrequest='requestNewCard()'
      ref='typecard'
      :card='card'
      :showCardBack='showCardBack'
      :throwOutEvent='throwOutEvent'
    />
    <CardOpen
      class='card'
      v-if='card.__typename === "UserAnswerOpenType"'
      @flip='flipCard()'
      @cardrequest='requestNewCard()'
      ref='typecard'
      :card='card'
      :showCardBack='showCardBack'
      :throwOutEvent='throwOutEvent' 
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
  props: ['card', 'showCardBack', 'throwOutEvent'],
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

.throwout-overlay-container {
  z-index: 10000;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
}

.throwout-icon-container {
  position: absolute;
  top: 1rem;
  // background: black;
  padding: 1rem;
  border-radius: 50%;
  // border: 4px solid red;
  overflow: hidden;

  &.right {
    left: -3.5rem;
  }

  &.left {
    right: -3.5rem
  }

 .throwout-icon{
    font-size: 10rem;

    &.right {
      color: rgb(156, 220, 89);
      // text-shadow: 0px 0px 4px rgb(156, 220, 89);
    }
    &.left {
      color: rgb(218, 73, 90);
      // text-shadow: 0px 0px 4px rgb(218, 73, 90);
    }
 }
}


</style>
