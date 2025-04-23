<script setup lang="ts">
import {Panzoom} from "@fancyapps/ui";
import "@fancyapps/ui/dist/panzoom/panzoom.css";
import {islandData} from "~/data/islandData";

const options = {
  initialSize: "fit",
  maxScale: 10,
  click: false,
};

const container = useTemplateRef("container");
onMounted(() => {
  new Panzoom(container.value, options)
});


</script>

<template>
  <div ref="container" class="max-h-full f-panzoom">
    <div class="f-panzoom__content relative">
      <NuxtImg class="max-h-screen" src="/map.svg"/>
      <IslandPin v-for="island in islandData" :key="island.id" :island-details="island"/>
    </div>
  </div>
</template>
