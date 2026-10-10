import { api } from './api';

export const initSsdByVessels = async () => {
    console.log('hello');
    const ssd = await api.get.lastSSD();
    return ssd;
};

export const middleware = {
    initSsdByVessels,
};
