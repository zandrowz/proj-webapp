export default function getCoordinates(coordinates: string) {
    let newCoords = coordinates.split(" ")
    for (let i = 0; i < newCoords.length; i++) {
        newCoords[i] = newCoords[i].replace(/[^\d.-]/g, '');
    }
    coordinates = coordinates.replace(/[^\d.-]/g, '');

    return [newCoords[1], newCoords[2]]
};