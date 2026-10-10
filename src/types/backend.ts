/* eslint-disable */
// Автоматически сгенерированные типы бэкенда

export type SSDCommonT = {
    idCompany: number;
    idVessel: number;
    idSsd: string;
    idZoneCurrent: number;
    idZoneArrival: number | null;
    coordinates: string | null;
    dateArrival: string | null;
    dateSsd: string;
    vessel: {
        idCompany: number;
        nameRus: string;
        nameEng: string | null;
        idVessel: number;
        id: string;
    } | null;
};

export type SSD2T = {
    idCompany: number;
    idVessel: number;
    idSsd: string;
    idZoneCurrent: number;
    idZoneArrival: number | null;
    coordinates: string | null;
    dateArrival: string | null;
    dateSsd: string;
    company: {
        idCompany: number;
        nameRus: string;
        nameEng: string;
        group: string | null;
    } | null;
};
