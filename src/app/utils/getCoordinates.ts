export const getCoordinates = (coordinates: string) => {
    return coordinates
        .trim()
        .split(' ')
        .map((val) => +val);
};
