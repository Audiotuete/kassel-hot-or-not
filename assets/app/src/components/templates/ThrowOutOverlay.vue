<template>
    <div 
      v-if='throwOutEvent.throwDirection.toString() === "Symbol("+ direction.toUpperCase() +")" && throwOutEvent.throwOutConfidence >= 1' 
      :class='"throwout-overlay-container " + direction'
      >
      <div
        :class='"throwout-icon-container " + direction'
        :style='{opacity: 1}'>
        <i 
          :class='"throwout-icon sl-icon icon-" + icon + " " + direction'
          :style='{color: color}'
        >
        </i>
      </div>
    </div>
</template>

<script>
export default {
  name: 'throwout-overlay',
  props: ['direction', 'icon', 'throwOutEvent', 'color']
}
</script>
<style lang="scss" scoped>

.throwout-overlay-container {
  z-index: 1000;
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
  // background: black;
  padding: 1rem;
  // border: 4px solid red;
  overflow: hidden;

  &.right {
    top: 1rem;
    left: -4.5rem;
    transform: rotate(-6deg);

  }
  &.left {
    top: 1rem;
    right: -4.5rem;
    transform: rotate(6deg);

  }
  &.up {
    bottom: -9rem;
    left: 3.5rem;
    transform: rotate(16deg);
  }
  &.down {
    top: -2rem;
    left: 3rem;
    transform: rotate(-4deg);

  }

 .throwout-icon{
    font-size: 10rem;
 }
}
</style>

