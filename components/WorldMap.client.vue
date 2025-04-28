<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import type {IslandDetails} from '~/types/IslandDetails';
import {createMapPinPopup} from '~/utils/createMapPinPopup';
import {useLiveMapData} from '~/composables/useLiveMapData';

const leafletMap = ref<L.Map>();
const circleLayer = L.layerGroup();
const imageLayer = L.layerGroup();
const imageMarkers: L.Marker[] = [];

const islandData = useLiveMapData();

const addMarkersToLayers = () => {
  islandData.value.forEach((island: IslandDetails) => {
    const x = island.xCoordinate || 0;
    const y = island.yCoordinate || 0;

    const circle = L.circle([y, x], {
      color: getMarkerColor(island.difficulty || 0),
      radius: 500,
    }).bindPopup(createMapPinPopup(island));
    circleLayer.addLayer(circle);

    const imageIcon = L.icon({
      iconUrl: `islands/${island.id}.png`,
      iconSize: [400, 400],
      iconAnchor: [75, 75],
      popupAnchor: [0, -75],
    });

    const imageMarker = L.marker([y, x], {icon: imageIcon}).bindPopup(createMapPinPopup(island));
    imageLayer.addLayer(imageMarker);
    imageMarkers.push(imageMarker);
  });
};

const updateImageMarkerSizes = () => {
  const zoom = leafletMap.value!.getZoom();
  const baseSize = 900;
  const scaleFactor = Math.pow(2, zoom);
  const newSize = baseSize * scaleFactor;
  const iconSize: [number, number] = [newSize, newSize];
  const iconAnchor: [number, number] = [newSize / 2, newSize / 2];
  const popupAnchor: [number, number] = [0, -newSize / 2];

  imageMarkers.forEach(marker => {
    const iconUrl = marker.options.icon?.options.iconUrl || '';
    const newIcon = L.icon({
      iconUrl,
      iconSize,
      iconAnchor,
      popupAnchor,
    });
    marker.setIcon(newIcon);
  });
};

const initLeafletMap = () => {
  const {yCoordinate, xCoordinate} = islandData.value[0];
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
  circleLayer.addTo(leafletMap.value!);

  const bounds = L.latLngBounds(islandData.value.map(i => [i.yCoordinate, i.xCoordinate]));
  leafletMap.value!.fitBounds(bounds, {padding: [100, 100]});

  const baseLayers = {
    Circles: circleLayer,
    Images: imageLayer,
  };
  L.control.layers(baseLayers).addTo(leafletMap.value!);

  leafletMap.value!.on('zoomend', () => {
    const zoom = leafletMap.value!.getZoom();
    if (zoom >= -4) {
      if (leafletMap.value!.hasLayer(circleLayer)) leafletMap.value!.removeLayer(circleLayer);
      if (!leafletMap.value!.hasLayer(imageLayer)) leafletMap.value!.addLayer(imageLayer);
      updateImageMarkerSizes();
    } else {
      if (leafletMap.value!.hasLayer(imageLayer)) leafletMap.value!.removeLayer(imageLayer);
      if (!leafletMap.value!.hasLayer(circleLayer)) leafletMap.value!.addLayer(circleLayer);
    }
  });
};

// ✅ Only init map **when islandData is available**
onMounted(() => {
  watch(
      () => islandData.value,
      (newVal) => {
        if (newVal.length > 0) {
          initLeafletMap();
        }
      },
      {immediate: true}
  );
});
</script>

<template>
  <div id="map" class="h-screen w-screen !bg-blue-200"/>
</template>



