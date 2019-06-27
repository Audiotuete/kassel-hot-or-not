<template>
  <div class='impressum-container'>
    <div class='impressum-heading impressum-heading__top-margin'>Impressum</div>      
    <BaseParagraph style="text-align: left"> 
        beWirken -<br> Jugendbildung auf Augenhöhe gUG (haftungsbeschränkt)
        <br>Vor dem Bardowicker Tore 15 
        <br>21339 Lüneburg
        <br>
    </BaseParagraph>
    <img style='width: 50%; margin: 1rem 0.5rem 0.5rem 0.5rem' src='https://umfrage.bewirken.org/wp-content/uploads/2019/05/Schrift_Logo_orange_64.png' alt=''>

    <BaseParagraph style="text-align: left">
            <a target="blank" href="https://www.bewirken.org/impressum/">beWirken Impressum</a>
    </BaseParagraph>
    <div class=' impressum-heading impressum-heading__top-margin'>Bei technischen Fragen:</div>
    <BaseParagraph style="text-align: left">
      <a href="mailto:it@bewirken.org">it@bewirken.org</a>
    </BaseParagraph>
    <div class=' impressum-heading impressum-heading__top-margin'>Datenschutz</div>      
    <BaseParagraph style="text-align: left">
      <strong>Dies ist eine Testumfrage. Die Daten werden nicht ausgewertet.</strong> Exemplarischer Datenschutz:  Alle personenbezogenen Daten der Teilnehmenden sind anonymisiert und ausschließlich zum Zwecke der Durchführung der Umfrageauswertung gespeichert und genutzt.
      Die Teilnehmer des Gewinnspiels, können eine E-Mailadresse hinterlassen, diese sind von den Umfragedaten getrennt und werden ausschließlich zum Zwecke der Durchführung des Gewinnspiels gespeichert und genutzt. Eine unberechtigte Weitergabe an Dritte findet nicht statt. Ebenso eine Nutzung für Werbezwecke. Nach Abschluss des Projektes Mai 2019 werden die Daten der Teilnehmenden gelöscht. Jeder Teilnehmende, der am Gewinnspiel teilnimmt, hat jederzeit die Möglichkeit die Einwilligung zur Speicherung der E-Mail-Adresse oder der Teilnahme am Wettbewerb zu widerrufen. Es reicht eine formlose E-Mail an: <a href="mailto:it@bewirken.org">it@bewirken.org</a>. 
      <br><br>
      Im Übrigen gelten die 
      <a href="https://www.bewirken.org/datenschutz/">beWirken Datenschutzbedingungen</a>.
    </BaseParagraph>
  </div> 
</template>


<script>

export default {
  name: 'Impressum',
  components: {}
}
</script>


<style lang="scss" scoped>

  a {
    color: $colorPrimary;
  }

  .impressum-container {
    overflow-y: scroll;
    height: 65vh;
  }

  .impressum-heading {
    margin: 0 0 0.25rem 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;

    &__top-margin {
      margin-top: 1rem;
    }
  }
</style>
