<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {islandData} from '~/data/islandData';
import type {IslandDetails} from '~/types/IslandDetails';
import {createMapPinPopup} from '~/utils/createMapPinPopup';

const leafletMap = ref<L.Map>();

const circleLayer = L.layerGroup();
const imageLayer = L.layerGroup();

const getMarkerColor = (difficulty: number) => {
  if (difficulty < 8) return '#96C839';
  if (difficulty < 11) return '#5BB096';
  if (difficulty < 14) return '#8E5BB7';
  return '#C8394B';
};

const addMarkersToLayers = () => {
  islandData.forEach((island: IslandDetails) => {
    const x = island.xCoordinate || 0;
    const y = island.yCoordinate || 0;

    // Circle marker
    const circle = L.circle([y, x], {
      color: getMarkerColor(island.difficulty || 0),
      radius: 500,
    }).bindPopup(createMapPinPopup(island));
    circleLayer.addLayer(circle);

    // Image marker (replace 'your-icon.png' with your actual image path)
    const imageIcon = L.icon({
      iconUrl: '/your-icon.png', // Public path or import via `new URL()`
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
    const imageMarker = L.marker([y, x], {icon: imageIcon}).bindPopup(createMapPinPopup(island));
    imageLayer.addLayer(imageMarker);
  });
};

const initLeafletMap = () => {
  const {yCoordinate, xCoordinate} = islandData[0];

  leafletMap.value = L.map('map', {
    crs: L.CRS.Simple,
    zoomControl: true,
    scrollWheelZoom: true,
    minZoom: -5,
    maxZoom: 5,
    zoomSnap: 0.1,
    attributionControl: false,
  }).setView([yCoordinate, xCoordinate], 0);

  addMarkersToLayers();

  // Default layer
  circleLayer.addTo(leafletMap.value!);

  // Fit bounds
  const bounds = L.latLngBounds(islandData.map(i => [i.yCoordinate, i.xCoordinate]));
  leafletMap.value!.fitBounds(bounds, {padding: [100, 100]});

  // Add Layer Control UI
  const baseLayers = {
    'Circles': circleLayer,
    'Images': imageLayer,
  };
  L.control.layers(baseLayers).addTo(leafletMap.value!);

  // Auto toggle based on zoom
  leafletMap.value!.on('zoomend', () => {
    const zoom = leafletMap.value!.getZoom();

    if (zoom >= -4) {
      if (leafletMap.value!.hasLayer(circleLayer)) {
        leafletMap.value!.removeLayer(circleLayer);
      }
      if (!leafletMap.value!.hasLayer(imageLayer)) {
        leafletMap.value!.addLayer(imageLayer);
      }
    } else {
      if (leafletMap.value!.hasLayer(imageLayer)) {
        leafletMap.value!.removeLayer(imageLayer);
      }
      if (!leafletMap.value!.hasLayer(circleLayer)) {
        leafletMap.value!.addLayer(circleLayer);
      }
    }
  });
};


onMounted(async () => {
  await nextTick();
  initLeafletMap();
});
</script>

<template>
  <div id="map" class="h-screen w-screen !bg-blue-200"/>
</template>


