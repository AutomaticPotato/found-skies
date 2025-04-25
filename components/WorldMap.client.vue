<script setup lang="ts">
import {islandData} from "~/data/islandData";
import L from 'leaflet'
import type {IslandDetails} from "~/types/IslandDetails";
import 'leaflet/dist/leaflet.css';


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
    minZoom: -8,
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

    L.circleMarker([y, x], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.8,
      radius: 5,
    }).bindPopup(buildPopup(island))
        .addTo(leafletMap.value!);


  });
  const bounds = L.latLngBounds(islandData.map(i => [i.yCoordinate, i.xCoordinate]));
  leafletMap.value!.fitBounds(bounds, {
    padding: [100, 100]
  });
};

const buildPopup = (islandDetails: IslandDetails) => {
  return `
  <div>
            <h2 class="text-xl">${islandDetails.name} - ${islandDetails.id}</h2>

            <div class="grid grid-cols-[auto_1fr] items-center gap-3 mt-3  break-words">
              <img src="icons/altitude.svg" class="size-5" />
              <span>${islandDetails.altitude || "Unknown"}</span>

              <img src="icons/swords.svg" class="size-5" />
              <span>${islandDetails.difficulty || "Unknown"}</span>

              <span title="Ark">Ark</span>
              <span>${islandDetails.ark || "Unknown"}</span>

              <img src="icons/brain.svg" class="size-5" />
              <span>${islandDetails.databanks || "Unknown"}</span>

              <img src="icons/pickaxe.svg" class="size-5" />
              <span>${islandDetails.metals?.join(', ') || "Unknown"}</span>

              <img src="icons/tree.svg" class="size-5" />
              <span>${islandDetails.wood?.join(', ') || "Unknown"}</span>

              <img src="icons/leaf.svg" class="size-5" />
              <span>${islandDetails.plants?.join(', ') || "Unknown"}</span>

              <img src="icons/package.svg" class="size-5" />
              <span>${islandDetails.items?.join(', ') || "Unknown"}</span>

              <img src="icons/paw.svg" class="size-5" />
              <span>${islandDetails.animals?.join(', ') || "Unknown"}</span>

              <img src="icons/treasure.svg" class="size-5" />
              <span>${islandDetails.chestItems?.join(', ') || "Unknown"}</span>

            <div class="flex flex-col mt-3 ">
              <span class="font-bold">Note:</span>
              <p class="max-w-80">
                ${islandDetails.note || "No notes"}
              </p>
            </div>
            </div>
  </div>
  `
}
</script>

<template>
  <div id="map" class="h-screen w-screen !bg-blue-200"/>
</template>
