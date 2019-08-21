<template>
    <div>
        <b-modal
                ref="modal"
                id="map-modal"
                :title="title"
                ok-only
                @shown="modalShown">
            <p>{{ address }}</p>
            <l-map ref="map" style="height: 300px; width: 100%; margin-bottom: 10px" :zoom="zoom" :center="[lat, lng]" :options="{zoomControl: true}">
                <l-tile-layer :url="url"></l-tile-layer>
                <l-marker :lat-lng="[lat, lng]" ></l-marker>
            </l-map>

            <b-button target="_blank" :href="'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng" block variant="primary">Navigate</b-button>
        </b-modal>
    </div>
</template>

<script>
    import EventBus from '../eventBus';

    export default {
        name: "MapPopup",

        data() {
            return {
                lat: null,
                lng: null,
                title: null,
                address: null,
                zoom: 16,
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            }
        },

        methods: {
            showMap() {
                this.$refs['modal'].show()
            },

            modalShown() {
                setTimeout(() => {
                    this.$refs['map'].mapObject.invalidateSize();
                }, 100);
            }

        },

        mounted() {
            EventBus.$on('MAP_REQUESTED', (payload) => {
                this.lat = payload.lat;
                this.lng = payload.lng;
                this.title = payload.title;
                this.address = payload.address.filter(x => x).toString(',&nbsp;');

                this.showMap()
            })
        }
    }
</script>

<style scoped>

</style>