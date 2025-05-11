<script setup lang="ts">
import { ref, computed } from "vue";
import type { IslandDetails } from "~/types/IslandDetails";
import { useVisitedIslandsStore } from "~/stores/useVisitedIslandsStore";

const { islandDetails } = defineProps<{ islandDetails: IslandDetails }>();

const store = useVisitedIslandsStore();
const isIslandVisited = computed(() => store.isIslandVisited(islandDetails.id));

const hasArc = computed(() => {
  if (islandDetails.ark === null || islandDetails.ark === undefined)
    return "❓";
  if (islandDetails.ark) return "✔️";
  return "❌";
});

const coverUrl = computed(() => `/covers/${islandDetails.id}.png`);
const isCoverImageLoaded = ref(true);
const showDialog = ref(false); // Tracks whether the dialog should be rendered
const imageDialog = useTemplateRef<HTMLDialogElement>("imageDialog");

const handleImageError = () => {
  isCoverImageLoaded.value = false;
};

const onCheckboxChange = (value: boolean) => {
  if (value) store.visitIsland(islandDetails.id);
  else store.unvisitIsland(islandDetails.id);
};

const openImageDialog = () => {
  showDialog.value = true; // Render the dialog
  imageDialog.value?.showModal();
};

const closeImageDialog = () => {
  showDialog.value = false; // Remove the dialog from the DOM
};
</script>

<template>
  <div class="min-w-60">
    <h2 class="text-xl">{{ islandDetails.name }} - {{ islandDetails.id }}</h2>
    <button class="cursor-pointer" @click="openImageDialog">
      <img
        v-if="isCoverImageLoaded"
        class="w-full rounded-xl drop-shadow active:drop-shadow-none"
        :src="coverUrl"
        alt="Island cover image"
        @error="handleImageError"
      />
    </button>
    <div class="grid grid-cols-[auto_1fr] items-center gap-3 mt-3 break-words">
      <img src="/icons/alt.svg" class="size-5" />
      <span>{{ islandDetails.altitude || "Unknown" }}</span>

      <img src="/icons/swords.svg" class="size-5" />
      <span>{{ islandDetails.difficulty || "Unknown" }}</span>

      <img src="/icons/ark.svg" class="size-5" />
      <span>{{ hasArc }}</span>

      <img src="/icons/databanks.svg" class="size-5" />
      <span>{{ islandDetails.databanks || "Unknown" }}</span>

      <img src="/icons/pickaxe.svg" class="size-5" />
      <span>{{ islandDetails.metals?.join(", ") || "Unknown" }}</span>

      <img src="/icons/tree.svg" class="size-5" />
      <span>{{ islandDetails.wood?.join(", ") || "Unknown" }}</span>

      <img src="/icons/leaf.svg" class="size-5" />
      <span>{{ islandDetails.plants?.join(", ") || "Unknown" }}</span>

      <img src="/icons/package.svg" class="size-5" />
      <span>{{ islandDetails.items?.join(", ") || "Unknown" }}</span>

      <img src="/icons/paw.svg" class="size-5" />
      <span>{{ islandDetails.animals?.join(", ") || "Unknown" }}</span>

      <img src="/icons/treasure.svg" class="size-5" />
      <span>{{ islandDetails.chestItems?.join(", ") || "Unknown" }}</span>

      <input
        type="checkbox"
        :checked="isIslandVisited"
        @change="onCheckboxChange($event.target?.checked)"
      />
      <span>Visited</span>
    </div>
  </div>
  <Teleport to="#teleports">
    <dialog
      v-if="showDialog"
      ref="imageDialog"
      class="fixed top-1/2 left-1/2 z-1000000 -translate-1/2 bg-white p-5 rounded-xl overflow-clip cursor-pointer drop-shadow-2xl"
      closedby="any"
      open
      @close="closeImageDialog"
      @click="closeImageDialog"
    >
      <img :src="coverUrl" />
    </dialog>
  </Teleport>
</template>
