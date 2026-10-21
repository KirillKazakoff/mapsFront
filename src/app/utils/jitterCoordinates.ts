import { SSDCommonT } from '../../types/backend';
import { parseCoordinates } from './parseCoordinates';

export interface JitteredSSD extends SSDCommonT {
    adjustedCoordinates: [number, number]; // Сюда запишем уникальные координаты
}

export const jitterCoordinates = (ssdList: SSDCommonT[]): JitteredSSD[] => {
    // Хранилище для подсчета: 'lat,lng' -> количество судов в этой точке
    const coordinateCounts: Record<string, number> = {};

    return ssdList
        .map((ssd) => {
            const parsed = parseCoordinates(ssd.coordinates) as [number, number] | null;
            if (!parsed) return null;

            const key = `${parsed[0].toFixed(5)},${parsed[1].toFixed(5)}`;

            // Запоминаем, какое это по счету судно в данной точке (0, 1, 2...)
            const indexInGroup = coordinateCounts[key] || 0;
            coordinateCounts[key] = indexInGroup + 1;

            if (indexInGroup === 0) {
                // Первое судно оставляем ровно в его оригинальных координатах
                return { ...ssd, adjustedCoordinates: parsed };
            }

            // Для последующих судов в этой же точке рассчитываем микро-смещение по кругу
            const angle = (indexInGroup * 2 * Math.PI) / 8; // Разносим по 8 направлениям
            const radius = 0.0003 * Math.ceil(indexInGroup / 8); // Шаг смещения

            const jitteredLat = parsed[0] + radius * Math.cos(angle);
            const jitteredLng = parsed[1] + radius * Math.sin(angle);

            return {
                ...ssd,
                adjustedCoordinates: [jitteredLat, jitteredLng],
            };
        })
        .filter((item): item is JitteredSSD => item !== null);
};
