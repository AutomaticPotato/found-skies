import {defineStore} from "pinia";

const localStorageKey = "visitedIslands";

export const useVisitedIslandsStore = defineStore("visitedIslands", () => {
    const visitedIslands = ref(localStorage.getItem(localStorageKey) ? new Set(JSON.parse(localStorage.getItem(localStorageKey) || '[]')) : new Set())


    const writeToLocalStorage = () => {
        localStorage.setItem(localStorageKey, JSON.stringify(Array.from(visitedIslands.value)))
    }

    const visitIsland = (id: number) => {
        visitedIslands.value.add(id)
        writeToLocalStorage()
    }

    const unvisitIsland = (id: number) => {
        visitedIslands.value.delete(id)
        writeToLocalStorage()
    }

    const isIslandVisited = (id: number) => {
        return visitedIslands.value.has(id)
    }
    return {
        visitedIslands, visitIsland, unvisitIsland, isIslandVisited
    }
})