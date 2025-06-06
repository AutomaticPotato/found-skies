<script setup lang="ts">
import {ref, onMounted, watch, nextTick} from 'vue';
import L, {type LatLngBoundsExpression} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import type {IslandDetails} from '~/types/IslandDetails';
import {createMapPinPopup} from '~/utils/createMapPinPopup';
import {useLiveMapData} from '~/composables/useLiveMapData';

const leafletMap = ref<L.Map>();
const circleLayer = L.layerGroup();
const imageLayer = L.layerGroup();
const imageMarkers: L.Marker[] = [];
const mapContainer = useTemplateRef("mapContainer")

const islandData = useLiveMapData();
const store = useVisitedIslandsStore();

const addMarkersToLayers = () => {
  islandData.value.forEach((island: IslandDetails) => {
    const x = island.xCoordinate || 0;
    const y = island.yCoordinate || 0;

    const bounds: LatLngBoundsExpression = [
      [y - 500, x - 500],
      [y + 500, x + 500],
    ];

    const isVisited = store.isIslandVisited(island.id);

    let shape: L.Layer;

    if (isVisited) {
      shape = L.rectangle(bounds, {
        color: getMarkerColor(island.difficulty || 0),
        weight: 2,
      }).bindPopup(createMapPinPopup(island));
    } else {
      shape = L.circle([y, x], {
        color: getMarkerColor(island.difficulty || 0),
        radius: 500,
      }).bindPopup(createMapPinPopup(island));
    }

    circleLayer.addLayer(shape);

    // Still add image marker
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
  if (!mapContainer.value) {
    console.error('Map container not found');
    return;
  }

  try {
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
  } catch (error) {
    console.error('Error initializing map:', error);
  }
};

// ✅ Only init map **when islandData is available and DOM is ready**
onMounted(() => {
  watch(
      () => islandData.value,
      (newVal) => {
        if (newVal.length > 0) {
          nextTick(() => {
            initLeafletMap();
          });
        }
      },
      {immediate: true}
  );
});

watch(() => store.visitedIslands, () => {
  circleLayer.clearLayers();
  imageLayer.clearLayers();
  imageMarkers.length = 0;
  addMarkersToLayers();
}, {deep: true});
</script>

<template>
  <div id="map" ref="mapContainer" class="h-screen w-screen !bg-blue-200"/>
</template>
