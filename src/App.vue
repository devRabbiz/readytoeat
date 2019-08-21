<template>
  <div id="app">
    <vue-title title="Ready to Eat :: 50% Food"></vue-title>
    <b-jumbotron header="Ready to Eat" lead="Reduced Food at Closing Time">
        <p>crussh, itsu, pod, wasabi</p>
    </b-jumbotron>
    <Locations/>
    <MapPopup/>

    <div>
      Location Missing? Send a Message to Get it Sorted
    </div>
  </div>
</template>

<script>
import Locations from "@/components/Locations";
import MapPopup from "@/components/MapPopup";

export default {
  name: 'app',
  components: {
    MapPopup,
    Locations,
  },

  created () {
    document.title = 'Ready to Eat :: 50% off your dinner for tonight';
  }
}
</script>

<style>
#app {
  text-align: center;
}
  @import 'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/materia/bootstrap.min.css';
</style>
