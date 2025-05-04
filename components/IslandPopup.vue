<script setup lang="ts">
import {computed} from "vue";
import type {IslandDetails} from "~/types/IslandDetails";
import {useVisitedIslandsStore} from "~/stores/useVisitedIslandsStore";

const {islandDetails} = defineProps<{ islandDetails: IslandDetails }>()

const store = useVisitedIslandsStore();
const isIslandVisited = computed(() => store.isIslandVisited(islandDetails.id));

const hasArc = computed(() => {
  if (islandDetails.ark === null || islandDetails.ark === undefined) return '❓';
  if (islandDetails.ark) return "✔️"
  return "❌"
})

const onCheckboxChange = (value: boolean) => {
  console.log(value)
  if (value) store.visitIsland(islandDetails.id);
  else store.unvisitIsland(islandDetails.id);
}
</script>

<template>
  <div>
    <h2 class="text-xl">{{ islandDetails.name }} - {{ islandDetails.id }}</h2>

    <div class="grid grid-cols-[auto_1fr] items-center gap-3 mt-3  break-words">
      <img src="/icons/altitude.svg" class="size-5"/>
      <span>{{ islandDetails.altitude || "Unknown" }}</span>

      <img src="/icons/swords.svg" class="size-5"/>
      <span>{{ islandDetails.difficulty || "Unknown" }}</span>

      <img src="/icons/ark.svg" class="size-5"/>
      <span>{{ hasArc }}</span>

      <img src="/icons/brain.svg" class="size-5"/>
      <span>{{ islandDetails.databanks || "Unknown" }}</span>

      <img src="/icons/pickaxe.svg" class="size-5"/>
      <span>{{ islandDetails.metals?.join(', ') || "Unknown" }}</span>

      <img src="/icons/tree.svg" class="size-5"/>
      <span>{{ islandDetails.wood?.join(', ') || "Unknown" }}</span>

      <img src="/icons/leaf.svg" class="size-5"/>
      <span>{{ islandDetails.plants?.join(', ') || "Unknown" }}</span>

      <img src="/icons/package.svg" class="size-5"/>
      <span>{{ islandDetails.items?.join(', ') || "Unknown" }}</span>

      <img src="/icons/paw.svg" class="size-5"/>
      <span>{{ islandDetails.animals?.join(', ') || "Unknown" }}</span>

      <img src="/icons/treasure.svg" class="size-5"/>
      <span>{{ islandDetails.chestItems?.join(', ') || "Unknown" }}</span>

      <input type="checkbox" :checked="isIslandVisited" @change="onCheckboxChange($event.target?.checked)">
      <span>Visited</span>
    </div>
  </div>
</template>
