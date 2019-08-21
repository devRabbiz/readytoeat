<template>
    <div id="locationList">
        <div v-for="location in locations" :key="location.title">

            <div v-if="location.show !== false">
                <b-card
                        :title="location.title"
                        :sub-title="location.state"
                        v-bind:class="[{'bg-success text-white': location.half_price, 'bg-warning text-white': location.warning}, location.type]">
                    <b-card-text>
                        I am {{ location.distance }} miles away <span v-if="location.half_price"> and currently half price</span>
                    </b-card-text>

                    <b-link v-on:click="launchModal(location.title, location.latitude, location.longitude, [location.address_1, location.address_2, location.city])"
                            class="card-link btn btn-primary">Open in Maps
                    </b-link>

                </b-card>
            </div>

        </div>
    </div>

</template>

<script>
    import * as opening_hours from 'opening_hours';
    import * as moment from 'moment';
    import EventBus from '../eventBus'
    import wasabi from '../data/wasabi'
    import itsu from '../data/itsu' // https://www.itsu.com/wp-admin/admin-ajax.php?action=locationList

    export default {
        name: "Locations",
        data() {
            return {
                locations: Array,
                lat: null,
                lng: null,
            }
        },

        methods: {
            pullData() {
                // Show a loader
                let loader = this.$loading.show({
                    canCancel: false,
                });

                // Add Wasabi
                this.locations = wasabi;

                // Add itsu
                this.locations = this.locations.concat(itsu);

                // Process Locations
                this.processLocations();
                loader.hide();

            },

            processLocations() {
                // Build our additional data
                this.locations.forEach((location) => {
                    // Location between user and store
                    location.distance = this.calculateDistance(this.lat, this.lng, location.latitude, location.longitude).toFixed(2);

                    // Deal with bloody bicester village and heathrow (itsu-specific as we don't have control over the api
                    if (location.hours[0].title === 'As per Bicester village' || location.title === 'Heathrow T5 Airside') {
                        location.show = false;
                    } else {
                        // Trim the last bits of weird meta data (itsu specific)
                        location.hours = location.hours.filter(function (i) {
                            return !i.highlight && !i.hours.includes('to close') && i.title !== 'beer & bowl deal available'
                        });

                        // Label itsu as its own type
                        if (location.address_1) {
                            location.type = "itsu"
                        }


                        // Format it in a way our parser plugin understands - itsu puts in a really bizarre way to we basically need to do some heavy lifting
                        let opening_hours_compat = location.hours
                            .map(i => this.formatDay(i.title) + ' ' + this.formatHours(i.hours) + '').join('; ');

                        location.oh = new opening_hours(opening_hours_compat);

                        // Calculate if they're closed, or closing
                        let time_till_change = moment(location.oh.getNextChange());
                        if (location.oh.getState() === 'close') {
                            location.state = 'Closed, will reopen in ' + time_till_change.toNow(true)
                        } else {
                            location.state = 'Closing in ' + time_till_change.toNow(true);

                            // Calc the actual difference so we can flag the element as nearly closing
                            let now = moment();
                            let difference = time_till_change.diff(now, 'minutes');

                            if (difference <= 30) {
                                location.half_price = true
                            } else if (difference <= 45) {
                                location.warning = true
                            }
                        }
                    }
                });

                // Sort out locations
                this.locations = this.sortArrays(this.locations);
            },

            calculateDistance(lat1, lon1, lat2, lon2) {
                if (lat1 == lat2 && lon1 == lon2) {
                    return 0;
                }
                let radlat1 = Math.PI * lat1 / 180;
                let radlat2 = Math.PI * lat2 / 180;
                let theta = lon1 - lon2;
                let radtheta = Math.PI * theta / 180;
                let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180 / Math.PI;
                dist = dist * 60 * 1.1515;

                return dist;
            },

            sortArrays(arrays) {
                return arrays.sort((a, b) => a.distance - b.distance);
            },

            formatHours(hours) {
                // Handle if a store is closed
                if (hours.toLowerCase() === 'closed') {
                    return 'off'
                }

                // otherwise format it as expected
                let times = hours.split('-');
                times[0] = moment(times[0], ['h:mm A']).format('HH:mm');
                times[1] = moment(times[1], ['h:mm A']).format('HH:mm');

                return times.join('-')
            },

            formatDay(day) {
                let days = day.split('-');
                days[0] = moment(days[0], ['dddd']).format('dd');

                if (days.length === 2) {
                    days[1] = moment(days[1], ['dddd']).format('dd');
                }

                return days.join('-')

            },

            launchModal(title, lat, lng, address) {
                // Communicate to the Modal system
                const payload = {
                    title: title,
                    lat: lat,
                    lng: lng,
                    address: address
                };

                EventBus.$emit('MAP_REQUESTED', payload)
            }
        },
        mounted() {
            // Get initial location
            this.$getLocation()
                .then(coordinates => {
                    this.lat = coordinates.lat;
                    this.lng = coordinates.lng;

                    this.pullData()

                });

            // Auto reorder list
            this.$watchLocation()
                .then(coordinates => {
                    this.lat = coordinates.lat;
                    this.lng = coordinates.lng;

                    this.locations = this.sortArrays(this.locations);
                })
        }
    }
</script>

<style scoped>
    .card {
        background-repeat: no-repeat;
    }

    .card.itsu {
        background-image: url('../assets/itsu.png');
    }

    .card.wasabi {
        background-image: url('../assets/wasabi.png');
    }
</style>