<template>
  <div class='impressum-container'>
    <div class=' impressum-heading'>Hinweis</div>      
    <BaseParagraph style="text-align: left">
      Erwachsene können ihre Anmerkung, Verbesserungsvorschläge und Wünsche dem Stadtbüro Friedrich-Ebert-Straße melden. <a href="stadtbuero@friedrich-ebert-strasse.net">stadtbuero@friedrich-ebert-strasse.net</a><br> oder 0561/60 285 630.
    </BaseParagraph>
    <div class='impressum-heading impressum-heading__top-margin'>Impressum</div>      
    <BaseParagraph style="text-align: left"> 
        Stadt Kassel -<br> Straßenverkehrs- und Tiefbauamt
        <br>Friedrichstraße 36
        <br>34112 Kassel
        <br>
        <br>Projektleitung: Wiebke Höfker
        <br>Projekt: <a href="https://www.stadt-kassel.de/projekte/verkehr/infos/24526/">Mobilitätskonzept Vorderer Westen</a>

        <br>E-Mail: <a href="mailto:wiebke.hoefker@kassel.de">wiebke.hoefker@kassel.de</a>
    </BaseParagraph>
    <img style='width: 80%' src='https://umfrage.bewirken.org/wp-content/uploads/2019/01/Kassel_RGB_Normal.png' alt=''>

    <BaseParagraph style="text-align: left">
            <a target="blank" href="https://www.kassel.de/kontakt/Impressum/">Impressum</a> der Stadt Kassel
    </BaseParagraph>
    <div class=' impressum-heading impressum-heading__top-margin'>Bei technischen Fragen:</div>
    <BaseParagraph style="text-align: left">
      <a href="mailto:it@bewirken.org">it@bewirken.org</a>
    </BaseParagraph>
    <div class=' impressum-heading impressum-heading__top-margin'>Datenschutz</div>      
    <BaseParagraph style="text-align: left">
      Alle personenbezogenen Daten der Teilnehmenden sind anonymisiert und ausschließlich zum Zwecke der Durchführung der Umfrageauswertung gespeichert und genutzt.
      Die Teilnehmer des Gewinnspiels, können eine E-Mailadresse hinterlassen, diese sind von den Umfragedaten getrennt und werden ausschließlich zum Zwecke der Durchführung des Gewinnspiels gespeichert und genutzt. Eine unberechtigte Weitergabe an Dritte findet nicht statt. Ebenso eine Nutzung für Werbezwecke. Nach Abschluss des Projektes Mai 2019 werden die Daten der Teilnehmenden gelöscht. Jeder Teilnehmende, der am Gewinnspiel teilnimmt, hat jederzeit die Möglichkeit die Einwilligung zur Speicherung der E-Mail-Adresse oder der Teilnahme am Wettbewerb zu widerrufen. Es reicht eine formlose E-Mail an: <a href="mailto:it@bewirken.org">it@bewirken.org</a> oder an die Adresse der Stadt Kassel. 
      <br><br>
      Im Übrigen gelten die 
      <a href="https://www.stadt-kassel.de/kontakt/datenschutz/">Datenschutzbedingungen der Stadt Kassel</a>.
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
