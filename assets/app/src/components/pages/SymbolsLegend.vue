<template>
  <div class='symbols-legend-container'>
    <!-- <span class='modal-heading modal-heading'>
      Info
    </span> -->
    <div class="symbols-list-container-outer">
      <div class="symbols-list-container-inner">
        <div class='symbols-container check'><i class='sl-icon icon-check'/><span class='symbol-text'>Ja</span></div>
        <div class='symbols-container close'><i class='sl-icon icon-close'/><span class='symbol-text'>Nein</span></div>
        <div class='symbols-container note'><i class='sl-icon icon-note'/><span class='symbol-text'>Anmerkung</span></div>
      </div>
      <hr class='devider'>
      <div class="symbols-list-container-inner">
        <div class='symbols-container action-redo'><span class='rotation'><i class='sl-icon icon-action-redo'/></span><span class='symbol-text'>Überspringen</span></div>
      </div>
    </div>
  </div> 
</template>

<script>

export default {
  name: 'SymbolsLegend',
  components: {}
}
</script>


<style lang="scss" scoped>

.symbols-legend-container {
  display: flex;
  flex-direction: column;
}

  .modal-heading {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
  }

  .symbols-list-container-outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom:.5rem;

  .symbols-list-container-inner {
    display: flex;
    flex-direction: column;
    padding-right: 1.75rem;
  }
}

.symbols-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.75rem;

  &.check {
    margin-top: 0;
    color: rgba(125, 211, 33, 0.75)
  }

  &.close {
    color: rgba(208, 2, 26, .5)
  }

  &.note {
    padding-left: 2px;
    color: rgba(245, 165, 35, .6)
  }

  &.doc {
    padding-left: 9px;
    color: #629EE4
  }

  &.action-redo {
    padding-left: 8px;
    color: #4A4A4A;
  }

  .symbol-text {
    margin-left: 1rem;
    font-weight: 600;
  }

  .icon-check {
    font-size: 12.5vw;
  }
  .icon-close {
    font-size: 12.5vw;
  }
  .icon-note {
    font-size: 12vw;
  }
  .icon-doc {
    font-size: 12vw;
  }
  .icon-action-redo {
    font-size: 12vw;
    transform: rotate(16deg);
  }

  .rotation {
    transform: rotate(-22deg)
  }
}

.devider {
  margin-top: 1.25rem;
  width: 91%;
  border: 0.5px solid rgba(0, 0, 0, 0.05);
}

</style>
