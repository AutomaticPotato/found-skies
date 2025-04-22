<script setup lang="ts">
import {Panzoom} from "@fancyapps/ui";
import "@fancyapps/ui/dist/panzoom/panzoom.css";

const options = {
  initialSize: "fit",
  maxScale: 10,

}

const container = useTemplateRef("container")
onMounted(() => {

new Panzoom(container.value, options)
})

</script>

<template>
  <div ref="container" class="h-full w-full f-panzoom">
    <NuxtImg class="f-panzoom__content" src="/map.svg" />
  </div>
</template>
