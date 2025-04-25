export type IslandDetails = {
    name: string,
    id: number,
    amountOfKnowledgeNodes?: number
    xCoordinate: number
    yCoordinate: number
    altitude?: number
    difficulty?: number
    ark?: boolean,
    note?: string,
    databanks?: number
    metals: string[],
    wood: string[],
    plants: string[],
    items: string[],
    animals: string[],
    chestItems: string[],
}