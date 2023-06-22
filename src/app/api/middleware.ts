/* eslint-disable no-param-reassign */
import { api } from './api';
import { SSDByVesselT } from '../types/types';

const initSsdByVessels = async () => {
    const vessels = await api.get.vessels();
    const ssdByVessel = await Promise.all(
        vessels.map((vessel) => api.get.ssdInfoByVessel(vessel.id)),
    );

    const ssdObj = ssdByVessel.reduce<SSDByVesselT>((total, ssdArray) => {
        if (ssdArray.length === 0) return total;
        const { vessel } = ssdArray[0].ssd;

        if (!total[vessel]) {
            total[vessel] = [];
        }
        total[vessel] = ssdArray;
        return total;
    }, {});

    console.log(ssdObj);
    return ssdObj;
};

export const middleware = {
    initSsdByVessels,
};
