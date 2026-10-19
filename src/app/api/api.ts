import axios from 'axios';
import { SSDCommonT, SSDFullT, VesselT } from '../../types/backend';
import type { HistoryPayloadT, LoginT } from '../../types/backend';

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

const getVessels = async () => {
    const res = await axios.get<VesselT[]>(`${baseUrl}/vessels`);
    return res.data;
};

const getSSDHistory = async (payload: HistoryPayloadT) => {
    const res = await axios.post(`${baseUrl}/ssd/history`, payload);
    return res.data;
};

const checkLogin = async (payload: LoginT) => {
    const res = await axios.post(`${baseUrl}/login`, payload);
    return res.data;
};

export const api = {
    get: {
        SSDById: getSSDById,
        lastSSD: getLastSSD,
        vessels: getVessels,
        ssdHistory: getSSDHistory,
    },
    login: checkLogin,
};
