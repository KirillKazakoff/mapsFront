export const parseCoordinates = (coordString: string): [number, number] => {
    // Регулярное выражение ищет группы: градусы, минуты и букву направления (N/S/E/W)
    const regex = /(\d+)°(\d+)([NSEW])/g;
    const matches = [...coordString.matchAll(regex)];

    if (matches.length !== 2) {
        throw new Error(
            'Неверный формат строки координат. Ожидается вид: 55°26N 146°44E'
        );
    }

    const convert = (degStr: string, minStr: string, direction: string): number => {
        const degrees = parseInt(degStr, 10);
        const minutes = parseInt(minStr, 10);

        // Переводим в десятичный формат (минуты делим на 60)
        let decimal = degrees + minutes / 60;

        // Если это Юг или Запад, координата должна быть с минусом
        if (direction === 'S' || direction === 'W') {
            decimal = -decimal;
        }

        // Округляем до 4 знаков после запятой для точности
        return Math.round(decimal * 10000) / 10000;
    };

    const lat = convert(matches[0][1], matches[0][2], matches[0][3]); // Широта (N/S)
    const lon = convert(matches[1][1], matches[1][2], matches[1][3]); // Долгота (E/W)

    return [lat, lon];
};
