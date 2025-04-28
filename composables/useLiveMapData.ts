import Papa from 'papaparse';
import {ref} from 'vue';
import type {IslandDetails} from '~/types/IslandDetails';

const liveDataUrl = "https://docs.google.com/spreadsheets/d/19hqTagUc_mKkPCioP0OQ_Dt7iesC4r_C5nMgRirHO8s/gviz/tq?tqx=out:csv";

const mapData = ref<IslandDetails[]>([]);

function fetchLiveMapData() {
    Papa.parse(liveDataUrl, {
        download: true,
        dynamicTyping: true,
        complete: (result) => {
            const rawRows = result.data as any[];

            mapData.value = rawRows
                .filter(row => !!row[0] && Number.isInteger(row[0]))
                .map(row => ({
                    id: row[0],
                    name: row[1] ?? "",
                    createdBy: row[2] ?? "",
                    link: row[3] ?? "",
                    xCoordinate: row[4] ?? 0,
                    yCoordinate: row[6] ?? 0,
                    altitude: row[7] ?? 0,
                    difficulty: typeof row[8] === 'string' ? parseInt(row[8].match(/\d+/)?.[0] || '0', 10) : 0,
                    databanks: row[9] ?? 0,
                    ark: row[10] ?? false,
                    metals: typeof row[11] === 'string' ? row[11].split(",") : [],
                    wood: typeof row[12] === 'string' ? row[12].split(",") : [],
                    plants: typeof row[13] === 'string' ? row[13].split(",") : [],
                    items: typeof row[14] === 'string' ? row[14].split(",") : [],
                    animals: typeof row[15] === 'string' ? row[15].split(",") : [],
                    chestItems: typeof row[16] === 'string' ? row[16].split(",") : [],
                    note: row[20] ?? "",
                }));
        },
        error: (error) => {
            console.error("Error fetching live map data:", error);
        }
    });
}

fetchLiveMapData();

export function useLiveMapData(): Ref<IslandDetails[]> {
    return mapData;
}

