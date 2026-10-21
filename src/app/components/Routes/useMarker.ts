import { LeafletEventHandlerFnMap, divIcon } from 'leaflet';
import { useRef, useState, useEffect } from 'react';
import { api } from '../../api/api';
import { ssdStore } from '../../stores/ssdStore';
import { dateDb } from '../../utils/date';
import { parseCoordinates } from '../../utils/parseCoordinates';
import { SSDCommonT } from '../../../types/backend';

type Props = { ssd: SSDCommonT };

export const useMarker = ({ ssd }: Props) => {
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

    let companyColor = 'green';
    if (ssd.idCompany === 3115 || ssd.idCompany === 1734) companyColor = 'red';
    if (ssd.idCompany === 3301) companyColor = 'blue';

    const divMarkerIcon = divIcon({
        html: `<div class='marker__wrapper svg--scale'>
                        <div class='marker__title'>${ssd?.vessel?.nameRus ?? ''}</div>
                        <img
                            class='svg svg-marker marker-${companyColor}'
                            src='./svg/location-pin.svg'
                            alt='remove-icon'
                        />
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
