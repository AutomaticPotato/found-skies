export const getMarkerColor = (difficulty: number) => {
    if (difficulty < 8) return '#96C839';
    if (difficulty < 11) return '#5BB096';
    if (difficulty < 14) return '#8E5BB7';
    return '#C8394B';
}
