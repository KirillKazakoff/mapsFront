import axios from 'axios';
import { SSDCommonT } from '../../types/backend';

const baseUrl = 'http://localhost:3001';

const getLastSSD = async () => {
    const res = await axios.get<SSDCommonT[]>(`${baseUrl}/ssd`);
    return res.data;
};

// const getSSDByVessel = async (id: string) => {
//     const res = await axios.get<SSDCommonT[]>(`${baseUrl}/vessel/${id}`);
//     return res.data;
// };

export const api = {
    get: {
        // vessel: getSSDByVessel,
        lastSSD: getLastSSD,
    },
};
