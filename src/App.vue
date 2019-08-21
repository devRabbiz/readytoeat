<template>
  <div id="app">
    <vue-title title="Ready to Eat :: 50% Food"></vue-title>
    <b-jumbotron header="Ready to Eat" lead="Reduced Food at Closing Time">
        <p>crussh, itsu, pod, wasabi</p>
    </b-jumbotron>
    <Locations/>
    <MapPopup/>

    <p>
      This website doesn't set any cookies apart from those required by Vue. It doesn't collect or store any of your personal data, it does however require access to your device location to function.
    </p>
    <p>
      Location Missing? Send a <a href="mailto:me@chrisireland.org">Message</a> to Get it Sorted
    </p>
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
}
</script>

<style>
#app {
  text-align: center;
}
  @import 'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/materia/bootstrap.min.css';
</style>
