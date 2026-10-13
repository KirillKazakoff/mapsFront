import axios from 'axios';
import { SSDCommonT, SSDFullT } from '../../types/backend';

const baseUrl = 'http://localhost:3001';

const getLastSSD = async () => {
    const res = await axios.get<SSDCommonT[]>(`${baseUrl}/ssd`);
    return res.data;
};

const getSSDById = async (id: string) => {
    const res = await axios.get<SSDFullT>(`${baseUrl}/ssd/${id}`);
    if (!res.data) return null;
    return res.data;
};

// const getSSDByVessel = async (id: string) => {
//     const res = await axios.get<SSDCommonT[]>(`${baseUrl}/vessel/${id}`);
//     return res.data;
// };

export const api = {
    get: {
        SSDById: getSSDById,
        lastSSD: getLastSSD,
    },
};
