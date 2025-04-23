<script setup lang="ts">
import {Panzoom} from "@fancyapps/ui";
import {Pins} from "@fancyapps/ui/dist/panzoom/panzoom.pins.esm";
import "@fancyapps/ui/dist/panzoom/panzoom.pins.css";
import "@fancyapps/ui/dist/panzoom/panzoom.css";
import {islandData} from "~/data/islandData";

const options = {
  initialSize: "fit",
  maxScale: 10,
  click: false,
}

const container = useTemplateRef("container")
onMounted(() => {

  new Panzoom(container.value, options, {Pins})
})

</script>

<template>
  <div ref="container" class="h-full w-full f-panzoom">
    <IslandPin v-for="island of islandData" :key="island.id" :island-details="island"  />
    <NuxtImg class="f-panzoom__content" src="/map.svg" />
  </div>
</template>
