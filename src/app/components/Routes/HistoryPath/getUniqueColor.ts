// Массив из 20 контрастных, хорошо видимых на карте цветов
const PALETTE_COLORS = [
    '#1890ff',
    '#ff4d4f',
    '#52c41a',
    '#faad14',
    '#722ed1',
    '#13c2c2',
    '#eb2f96',
    '#fa8c16',
    '#fa541c',
    '#2f54eb',
    '#a0d911',
    '#13c2c2',
    '#9254de',
    '#f5222d',
    '#52c41a',
    '#36cfc9',
    '#ff7a45',
    '#ffec3d',
    '#595959',
    '#141414',
];

// Функция получения цвета на основе ID (всегда вернет один и тот же цвет для одного ID)
export const getUniqueColor = (id: number | string): string => {
    const stringId = String(id);
    let hash = 0;

    for (let i = 0; i < stringId.length; i += 1) {
        // eslint-disable-next-line no-bitwise
        hash = (stringId.charCodeAt(i) + ((hash << 5) - hash)) | 0;
    }

    const index = Math.abs(hash) % PALETTE_COLORS.length;
    return PALETTE_COLORS[index];
};
