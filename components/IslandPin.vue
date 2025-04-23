<script setup lang="ts">
 import type {IslandDetails} from "~/types/IslandDetails";

 const {islandDetails} = defineProps<{
   islandDetails: IslandDetails
 }>()

 const xPosition = computed(() => `${islandDetails.xPercentage}%`)
 const yPosition = computed(() => `${islandDetails.yPercentage}%`)
</script>

<template>
  <div data-panzoom-pin :data-x="xPosition" :data-y="yPosition">
    <UPopover>
      <UButton icon="solar:info-circle-bold" class="text-2xl" />
      <template #content>
        <UCard variant="subtle" class="bg-blue-100 drop-shadow-lg rounded-md px-5 py-3">
          <template #header>
            <h2>{{islandDetails.name}} - {{islandDetails.id}}</h2>
          </template>

          <template #default>
            <div class="grid grid-cols-2 items-center gap-3">
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
            </div>
          </template>
        </UCard>
      </template>
    </UPopover>
  </div>
</template>
