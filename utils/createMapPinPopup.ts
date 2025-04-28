import type {IslandDetails} from "~/types/IslandDetails";

export const createMapPinPopup = (islandDetails: IslandDetails) => {
    return `
  <div class="">
            <h2 class="text-xl">${islandDetails.name} - ${islandDetails.id}</h2>

            <div class="grid grid-cols-[auto_1fr] items-center gap-3 mt-3  break-words">
              <img src="icons/altitude.svg" class="size-5" />
              <span>${islandDetails.altitude || "Unknown"}</span>

              <img src="icons/swords.svg" class="size-5" />
              <span>${islandDetails.difficulty || "Unknown"}</span>

              <span title="Ark">Ark</span>
              <span>${islandDetails.ark || "Unknown"}</span>

              <img src="icons/brain.svg" class="size-5" />
              <span>${islandDetails.databanks || "Unknown"}</span>

              <img src="icons/pickaxe.svg" class="size-5" />
              <span>${islandDetails.metals?.join(', ') || "Unknown"}</span>

              <img src="icons/tree.svg" class="size-5" />
              <span>${islandDetails.wood?.join(', ') || "Unknown"}</span>

              <img src="icons/leaf.svg" class="size-5" />
              <span>${islandDetails.plants?.join(', ') || "Unknown"}</span>

              <img src="icons/package.svg" class="size-5" />
              <span>${islandDetails.items?.join(', ') || "Unknown"}</span>

              <img src="icons/paw.svg" class="size-5" />
              <span>${islandDetails.animals?.join(', ') || "Unknown"}</span>

              <img src="icons/treasure.svg" class="size-5" />
              <span>${islandDetails.chestItems?.join(', ') || "Unknown"}</span>

            </div>
  </div>
  `
}
