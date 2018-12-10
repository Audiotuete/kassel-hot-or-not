
<template>
  <div>
    <div v-if='card.__typename === "UserAnswerYesOrNoType"'>
      <ThrowOutOverlay :direction='"right"' :icon='"check"' :color='"#9cdc59"' :throwOutEvent='throwOutEvent'/>
      <ThrowOutOverlay :direction='"left"' :icon='"close"' :color='"#da495a"' :throwOutEvent='throwOutEvent'/>
      <ThrowOutOverlay v-if='!showCardBack' :direction='"down"' :icon='"note"' :color='"#f4a82f"' :throwOutEvent='throwOutEvent'/>
      <ThrowOutOverlay v-if='showCardBack' :direction='"down"' :icon='"doc"' :color='"#4A90E2"' :throwOutEvent='throwOutEvent'/>
      <ThrowOutOverlay  :direction='"up"' :icon='"action-redo"' :color='"#555"' :throwOutEvent='throwOutEvent'/>
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
    <div v-if='card.__typename === "UserAnswerMultipleType"'>
      <ThrowOutOverlay :direction='"right"' :icon='"doc"' :color='"#4A90E2"' :throwOutEvent='throwOutEvent'/>
      <ThrowOutOverlay :direction='"left"' :icon='"doc"' :color='"#4A90E2"' :throwOutEvent='throwOutEvent'/>
      <ThrowOutOverlay :direction='"down"' :icon='"doc"' :color='"#4A90E2"' :throwOutEvent='throwOutEvent'/>
      <ThrowOutOverlay :direction='"up"' :icon='"action-redo"' :color='"#555"' :throwOutEvent='throwOutEvent'/>
    </div>
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
    <div v-if='card.__typename === "UserAnswerOpenType"'>
      <ThrowOutOverlay :direction='"right"' :icon='"doc"' :color='"#4A90E2"' :throwOutEvent='throwOutEvent'/>
      <ThrowOutOverlay :direction='"left"' :icon='"doc"' :color='"#4A90E2"' :throwOutEvent='throwOutEvent'/>
      <ThrowOutOverlay :direction='"down"' :icon='"doc"' :color='"#4A90E2"' :throwOutEvent='throwOutEvent'/>
      <ThrowOutOverlay :direction='"up"' :icon='"action-redo"' :color='"#555"' :throwOutEvent='throwOutEvent'/>
    </div>
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
import ThrowOutOverlay from '../templates/ThrowOutOverlay'


// GraphQL
// update CardYesOrNo

export default {
  name: 'card-wrapper',
  props: ['card', 'showCardBack', 'throwOutEvent'],
  components: { CardYesOrNo, CardMultiple, CardOpen, ThrowOutOverlay },
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
  top: 10vh;
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
