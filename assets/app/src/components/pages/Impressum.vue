<template>
  <div class='impressum-container'>
      <div class='impressum-heading'>Impressum</div>      
      <BaseParagraph style="text-align: left"> 
          Straßenverkehrs- <br>und Tiefbauamt - Verkehr
          <br>Friedrichsstraße 36, 34117 Kassel
          <br>documenta-Stadt (kreisfreie Stadt)
          <br>Tel: 0561 / 787-787
          <br>Fax: 0561 / 787-3140
          <br><a href="mailto:info@kassel.de">info@kassel.de</a>
      </BaseParagraph>
      <img style='width: 80%' src='https://umfrage.bewirken.org/wp-content/uploads/2019/01/Kassel_RGB_Normal.png' alt=''>

      <div class='impressum-heading'>Datenschutz</div>      

    <BaseParagraph style="text-align: left">
      Alle personenbezogenen Daten der Teilnehmenden werden anonymisiert und ausschließlich zum Zwecke der
      Durchführung des Gewinnspiels sowie der Umfrageauswertung gespeichert und genutzt. Eine unberechtigte
      Weitergabe an Dritte findet nicht statt. Ebenso eine Nutzung für Werbezwecke. 
      Nach Abschluss des Projektes werden die Daten der Teilnehmenden unverzüglich gelöscht.
    </BaseParagraph>
  </div> 
</template>

<script>
import Modal from '../../components/templates/Modal'

export default {
  name: 'Impressum',
  components: {Modal}
}
</script>


<style lang="scss" scoped>

  .impressum-heading {
    margin: 0 0 0.5rem 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
  }
</style>
