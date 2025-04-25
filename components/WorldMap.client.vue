<script setup lang="ts">
import {islandData} from "~/data/islandData";
import L from 'leaflet'
import type {IslandDetails} from "~/types/IslandDetails";
import 'leaflet/dist/leaflet.css';
import {createMapPinPopup} from "~/utils/createMapPinPopup";


const leafletMap = ref<L.Map>()

onMounted(async () => {
  await nextTick()
  initLeafletMap()
  await nextTick()

})

const initLeafletMap = () => {
  const {yCoordinate, xCoordinate} = islandData[0] //starter island
  leafletMap.value = L.map("map", {
    crs: L.CRS.Simple,
    zoomControl: true,
    scrollWheelZoom: true,
    minZoom: -5,
    maxZoom: 5,
    zoomSnap: 0.1,
    attributionControl: false,
  }).setView([yCoordinate, xCoordinate], 0);
  addMarkersToMap()
}
const addMarkersToMap = () => {
  islandData.forEach((island: IslandDetails) => {
    const x = island.xCoordinate || 0;
    const y = island.yCoordinate || 0;

    L.circle([y, x], {
      color: getMarkerColor(island.difficulty || 0),
      radius: 500,
    }).bindPopup(createMapPinPopup(island))
        .addTo(leafletMap.value!);


  });
  const bounds = L.latLngBounds(islandData.map(i => [i.yCoordinate, i.xCoordinate]));
  leafletMap.value!.fitBounds(bounds, {
    padding: [100, 100]
  });
};

const getMarkerColor = (difficulty: number) => {
  if (difficulty < 8) return '#96C839'
  if (difficulty < 11) return '#5BB096'
  if (difficulty < 14) return '#8E5BB7'
  else return '#C8394B'
}

</script>

<template>
  <div id="map" class="h-screen w-screen !bg-blue-200"/>
</template>
