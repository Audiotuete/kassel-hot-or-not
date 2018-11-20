<template>
  <div class='modal'>
    <div class="overlay" @click='$emit("close", $event.target.value)'></div>
    <div class='modal-card'>
      <div class='modal-content-container'>
          <button v-if='closebutton' class='modal-header-icon' @click='$emit("close", $event.target.value)'>
            <i class='sl-icon icon-close'></i>
          </button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    closebutton: {
      type: Boolean,
      default: true,
      required: false
    },
  }
}
</script>


<style lang='scss' scoped>

.modal {
  display: flex; 
  justify-content:center;
}

.overlay {
  z-index: 1000;
  top: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
}

.modal-card {
  z-index: 1000;
  position: absolute;
  width: calc(65% * 1.4);
  display: flex;
  top: 3%;
  justify-content: center;
  align-items: center;  
  background-color: #fff;
  border-radius: 1.5vh;
  box-shadow: 0 0 15px 0 $colorPrimary;
  overflow: hidden;
  padding-bottom: 0.75rem;

  .modal-content-container {
    font-size: 1rem;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    box-sizing: border-box;
    padding: 3vh 3vw 2vh 3vw;
  }

  .modal-header-icon {
    position: absolute;
    right: 3vw;
    top: 1rem;
    font-size: 1.5rem;
    color: #555;
  }

  
}



</style>

