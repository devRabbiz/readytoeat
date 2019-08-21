<template>
    <div id="app">
        <b-jumbotron text-variant="white" style="text-shadow: black 0 0 6px; background-image: url('https://images.unsplash.com/photo-1534482421-64566f976cfa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80')" header="Ready to Eat" lead="Reduced Food at Closing Time">
            <p>crussh, itsu, pod, wasabi</p>
        </b-jumbotron>
        <Locations/>
        <MapPopup/>
        <Permission/>

        <p>
            This website doesn't set any cookies apart from those required by Vue. It doesn't collect or store any of
            your personal data, it does however require access to your device location to function.
        </p>
        <p>
            Location missing? Send a <a href="mailto:me@chrisireland.org">message</a> to get it sorted
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

    @import 'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/materia/bootstrap.min.css';
</style>
