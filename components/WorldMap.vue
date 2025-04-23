<script setup lang="ts">
import {Panzoom} from "@fancyapps/ui";
import "@fancyapps/ui/dist/panzoom/panzoom.css";
import {islandData} from "~/data/islandData";

const options = {
  initialSize: "fit",
  maxScale: 10,
  click: false,
  Pins: {
    autoScale: true,
  },
};

const container = useTemplateRef("container");
onMounted(() => {
  new Panzoom(container.value, options)
});


</script>

<template>
  <div ref="container" class="h-full w-full f-panzoom">
    <div class="f-panzoom__content relative">
      <NuxtImg :placeholder="[2100, 2200]" src="/map.svg"/>
      <IslandPin v-for="island in islandData" :key="island.id" :island-details="island"/>
    </div>
  </div>
</template>
