<template>
    <div id="app">
        <b-jumbotron text-variant="white" class="hero-header" header="Ready to Eat" lead="50% off Food at Closing Time">
            <p>coco di mama, crussh, itsu, pod, tossed, wasabi</p>
            <p>(hours may vary during public holidays)</p>
        </b-jumbotron>
        <Locations/>
        <MapPopup/>
        <Permission/>

        <p>
            This website doesn't set any cookies apart from those required by Vue. It doesn't collect or store any of
            your personal data, it does however require access to your device location to function.
        </p>
        <p>
            Location missing? Send a <a href="mailto:me@chrisireland.org">message</a> to get it sorted &bull; <a href="https://github.com/lungyiin/readytoeat">GitHub</a>
        </p>
    </div>
</template>

<script>
    import Locations from "@/components/Locations";
    import MapPopup from "@/components/MapPopup";
    import Permission from "@/components/Permission";

    export default {
        name: 'app',
        components: {
            Permission,
            MapPopup,
            Locations,
        },
    }
</script>

<style>
    #app {
        text-align: center;
    }

    .hero-header {
        text-shadow: black 0 0 6px;
        background-position: center center;
        background-image: url('https://images.unsplash.com/photo-1534482421-64566f976cfa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80')
    }

    @import 'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/materia/bootstrap.min.css';
</style>
