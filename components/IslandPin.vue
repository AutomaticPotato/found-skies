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

    <UPopover>
      <UButton>
        <div class="min-w-15 min-h-15 "/>
      </UButton>
      <template #content>
        <UCard variant="subtle" class="bg-blue-100 drop-shadow-lg rounded-md px-5 py-3">
          <template #header>
            <h2 class="text-xl">{{islandDetails.name}} - {{islandDetails.id}}</h2>
          </template>

          <template #default>
            <div class="grid grid-cols-2 items-center gap-3 mt-3">
              <Icon v-if="islandDetails.amountOfKnowledgeNodes" size="20" name="game-icons:brain" />
              <span v-if="islandDetails.amountOfKnowledgeNodes">{{islandDetails.amountOfKnowledgeNodes}}</span>

              <Icon v-if="islandDetails.altitude" size="20" name="material-symbols:altitude" />
             <span v-if="islandDetails.altitude">{{islandDetails.altitude}}</span>

              <span v-if="islandDetails.xCoordinate">X</span>
              <span v-if="islandDetails.xCoordinate">{{islandDetails.xCoordinate}}</span>


              <span v-if="islandDetails.yCoordinate">Y</span>
              <span v-if="islandDetails.yCoordinate">{{islandDetails.yCoordinate}}</span>

              <Icon v-if="islandDetails.difficulty" size="20" name="material-symbols-light:swords" />
              <span v-if="islandDetails.difficulty">{{islandDetails.difficulty}}</span>


              <span>Ark</span>
              <span >{{islandHasArk}}</span>
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
