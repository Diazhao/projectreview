<template>
  <div id='map' class="side-bar-middle">
  </div>
</template>

<script>
// import * as L from 'leaflet';

export default {
    name: 'sidebar',
    mounted() {
        var map = L.map('map').setView([30, 120], 13);
        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map);
    },
    data () {
        return {
            msg: 'Hello world!'
        }
    }
}
</script>

<style>
    .side-bar-middle {
        position: absolute;
        left: 450px;
        right: 450px;
        top: 0;
        bottom: 0;
        border: 1px solid;
        height: 99%;
    }
</style>