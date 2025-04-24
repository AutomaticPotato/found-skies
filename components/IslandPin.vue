<script setup lang="ts">
 import type {IslandDetails} from "~/types/IslandDetails";

 const {islandDetails} = defineProps<{
   islandDetails: IslandDetails
 }>()

 const xPosition = computed(() => `${islandDetails.xPercentage}%`)
 const yPosition = computed(() => `${islandDetails.yPercentage}%`)

 const islandHasArk = computed<"Yes" | "No" | "Unknown">(() => {
   if (islandDetails.ark === undefined) return "Unknown"
   else if (islandDetails.ark) return "Yes"
   return "No"
 })
</script>

<template>
  <div class="absolute" :style="{ left: xPosition, top: yPosition }">

    <UPopover trigger="click">
      <UButton>
        <div class="min-w-15 min-h-15" />
      </UButton>
      <template #content>
        <UCard variant="subtle" class="bg-blue-100 drop-shadow-lg rounded-md px-5 py-3">
          <template #header>
            <h2 class="text-xl">{{islandDetails.name}} - {{islandDetails.id}}</h2>
          </template>

          <template #default>
            <div class="grid grid-cols-[auto_1fr] items-center gap-3 mt-3 max-w-sm break-words">
              <Icon size="20" name="material-symbols:altitude" :title="'Altitude'" />
              <span>{{islandDetails.altitude || "Unknown"}}</span>

              <!-- <span title="X Coordinate">X</span>
              <span>{{islandDetails.xCoordinate || "Unknown"}}</span>

              <span title="Y Coordinate">Y</span>
              <span>{{islandDetails.yCoordinate || "Unknown"}}</span> -->

              <Icon size="20" name="material-symbols-light:swords" :title="'Difficulty'" />
              <span>{{islandDetails.difficulty || "Unknown"}}</span>

              <span title="Ark">Ark</span>
              <span>{{islandHasArk}}</span>

              <Icon size="20" name="game-icons:brain" :title="'Databanks'" />
              <span>{{islandDetails.databanks || "Unknown"}}</span>

              <Icon size="20" name="mdi:pickaxe" :title="'Metals'" />
              <span>{{islandDetails.metals?.join(', ') || "Unknown"}}</span>

              <Icon size="20" name="mdi:tree" :title="'Wood'" />
              <span>{{islandDetails.wood?.join(', ') || "Unknown"}}</span>

              <Icon size="20" name="mdi:leaf" :title="'Plants'" />
              <span>{{islandDetails.plants?.join(', ') || "Unknown"}}</span>

              <Icon size="20" name="mdi:package-variant" :title="'Items'" />
              <span>{{islandDetails.items?.join(', ') || "Unknown"}}</span>

              <Icon size="20" name="mdi:paw" :title="'Animals'" />
              <span>{{islandDetails.animals?.join(', ') || "Unknown"}}</span>

              <Icon size="20" name="mdi:treasure-chest" :title="'Chest Items'" />
              <span>{{islandDetails.chestItems?.join(', ') || "Unknown"}}</span>
            </div>
          </template>

          <template v-if="islandDetails.note" #footer>
            <div class="flex flex-col mt-3">
              <span class="font-bold">Note:</span>
              <p class="max-w-80">
                {{islandDetails.note}}
              </p>
            </div>
          </template>
        </UCard>
      </template>
    </UPopover>
  </div>
</template>

<style scoped>

</style>
