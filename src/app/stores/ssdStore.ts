/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable lines-between-class-members */
import { makeAutoObservable } from 'mobx';
import { SSDCommonT, SSDFullT } from '../../types/backend';

// Опишите тип позиции ССД, который возвращает бэкенд

class SSDStore {
    ssdHistory: SSDCommonT[] = [];
    ssdLast: SSDCommonT[] = [];
    ssdCurrent: SSDFullT;
    isLoading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Экшен для загрузки данных с бэка
    setCommonSSD(data: SSDCommonT[]) {
        this.ssdLast = data;
    }
    setCurrentSSD(data: SSDFullT) {
        this.ssdCurrent = data;
    }
    setHistory(data: SSDCommonT[]) {
        this.ssdHistory = data;
    }

    setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    // Опционально: экшен для очистки данных (например, при размонтировании страницы)
    clearHistory() {
        this.ssdHistory = [];
        this.error = null;
    }
}

// Экспортируем синглтон стора
export const ssdStore = new SSDStore();
