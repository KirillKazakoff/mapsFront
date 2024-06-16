import axios from 'axios';
import { Vessel, SSDInfoT } from '../types/models';

const baseUrl = 'http://localhost:9092';

const vessel = async (id: string) => {
    const res = await axios.get<Vessel>(`${baseUrl}/vessel/${id}`);
    return res.data;
};

const vessels = async () => {
    const res = await axios.get<Vessel[]>(`${baseUrl}/vessels/all`);
    return res.data;
};

const ssdInfoByVessel = async (id: string) => {
    const res = await axios.get<SSDInfoT[]>(`${baseUrl}/ssd/${id}`);
    return res.data;
};

export const api = {
    get: {
        vessel,
        vessels,
        ssdInfoByVessel,
    },
};
