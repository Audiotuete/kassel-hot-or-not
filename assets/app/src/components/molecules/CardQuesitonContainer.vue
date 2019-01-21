
<template>
  <div :style='background' class='question-image-text'>
    <div class="overlay"></div>
    <span class='question-text'>{{card.question.questionText}}</span>
  </div>
</template>

<script>

// GraphQL

export default {
  name: 'card-question-container',
  props: ['card'],
  data () {
    return {
      background: {
        backgroundImage: 'url(' + this.card.question.questionImagelink + ')'
      }
    }
  }
}
</script>

<style scoped lang='scss'>

  .question-image-text {
    position: relative;
    background-repeat: no-repeat;
    background-size: 19.6875rem 23.625rem;
    // background-attachment: fixed;
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

  .question-text {
    z-index: 50;
    color: #fff;
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 1);
    width: 80%;
  }

</style>
