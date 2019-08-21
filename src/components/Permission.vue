<template>
    <div>
        <b-modal
                ref="modal"
                ok-only
                title="Location Permission">
            <p>This website requires access to your browser's location to function properly.</p>
            <p>Without this access, it defaults to central London</p>

        </b-modal>
    </div>
</template>

<script>
    import EventBus from '../eventBus';

    export default {
        name: "Permission",

        mounted() {
            EventBus.$on('LOCATION_ISSUE', () => {
                this.$refs['modal'].show()
            })
        }
    }
</script>

<style scoped>

</style>