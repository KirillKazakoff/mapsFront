import { LeafletEventHandlerFnMap, divIcon } from 'leaflet';
import { useRef, useState, useEffect } from 'react';
import { api } from '../../api/api';
import { ssdStore } from '../../stores/ssdStore';
import { dateDb } from '../../utils/date';
import { parseCoordinates } from '../../utils/parseCoordinates';
import { SSDCommonT } from '../../../types/backend';

type Props = { ssd: SSDCommonT; color?: string };

export const useMarker = ({ ssd, color }: Props) => {
    const coordinates = parseCoordinates(ssd.coordinates);
    const markerRef = useRef<any>(null);

    const { ssdCurrent } = ssdStore;
    const isCurrentSSDLoaded = ssdCurrent && ssdCurrent.idSsd === ssd.idSsd;
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        if (status === 'loaded' && isCurrentSSDLoaded && markerRef.current) {
            // Задержка в setTimeout(0) нужна, чтобы React гарантированно успел
            // вставить <PopupLeaflet> в DOM перед тем, как Leaflet попытается его открыть
            setTimeout(() => markerRef.current.openPopup(), 0);
        }
    }, [status, isCurrentSSDLoaded]); // Реагирует строго на смену статуса и готовность данных

    const date = dateDb.fromDb(ssd.dateSsd);

    // 2. Создаем ссылку на инстанс маркера Leaflet
    const eventHandlers: LeafletEventHandlerFnMap = {
        click: async () => {
            setStatus('loading');
            ssdStore.setCurrentSSD(null);

            try {
                const res = await api.get.SSDById(ssd.idSsd);
                ssdStore.setCurrentSSD(res);
                setStatus('loaded');
            } catch (error) {
                console.error('Ошибка загрузки ССД:', error);
                setStatus('error');
            }
        },
    };

    let markerColor = 'green';
    if (ssd.idCompany === 3115 || ssd.idCompany === 1734) markerColor = 'red';
    if (ssd.idCompany === 3301) markerColor = 'blue';
    if (color) markerColor = color;

    const divMarkerIcon = divIcon({
        html: `<div class='marker__wrapper svg--scale'>
                <div class='marker__title'>${ssd?.vessel?.nameRus ?? ''}</div>
                
                <!-- Вставляем код вашего SVG напрямую (ниже пример стандартного пина) -->
                <svg 
                    class='svg svg-marker' 
                    viewBox='0 0 24 24' 
                    style='width: 32px; height: 32px; fill: ${markerColor};'
                >
                    <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/>
                </svg>
            </div>`,
    });

    return {
        ref: markerRef,
        eventHandlers,
        date,
        divMarkerIcon,
        isCurrentSSDLoaded,
        coordinates,
        ssdCurrent,
    };
};
