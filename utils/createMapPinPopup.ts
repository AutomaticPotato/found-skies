import {createApp} from 'vue';
import IslandPopup from '~/components/IslandPopup.vue';
import type {IslandDetails} from '~/types/IslandDetails';

export function createMapPinPopup(islandDetails: IslandDetails): HTMLElement {
    const container = document.createElement('div');
    const app = createApp(IslandPopup, {islandDetails});
    app.mount(container);
    return container;
}
