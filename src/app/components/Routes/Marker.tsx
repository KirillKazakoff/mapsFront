import { Card } from 'antd';
import { divIcon, LatLngExpression, LeafletEventHandlerFnMap } from 'leaflet';
import React, { useEffect, useState, useRef } from 'react'; // 1. Импортируем useRef
import { Marker, Popup as PopupLeaflet } from 'react-leaflet';
import { observer } from 'mobx-react-lite';
import { dateDb } from '../../utils/date';
import { parseCoordinates } from '../../utils/parseCoordinates';
import ProdInputTab from './PopupTabs/ProdInputTab';
import ProdOutputTab from './PopupTabs/ProdOutputTab';
import { SSDCommonT } from '../../../types/backend';
import { api } from '../../api/api';
import ProdTransportedTab from './PopupTabs/ProdTransportedTab';
import { ssdStore } from '../../stores/ssdStore';

type Props = { ssd: SSDCommonT };

export const MarkerSSD = observer(({ ssd }: Props) => {
    const coordinates = parseCoordinates(ssd.coordinates);
    if (!coordinates) return null;

    const date = dateDb.fromDb(ssd.dateSsd);
    const { ssdCurrent } = ssdStore;

    // 2. Создаем ссылку на инстанс маркера Leaflet
    const markerRef = useRef<any>(null);

    const [status, setStatus] = useState('idle');

    const isCurrentSSDLoaded = ssdCurrent && ssdCurrent.idSsd === ssd.idSsd;

    useEffect(() => {
        if (status === 'loaded' && isCurrentSSDLoaded && markerRef.current) {
            // Задержка в setTimeout(0) нужна, чтобы React гарантированно успел
            // вставить <PopupLeaflet> в DOM перед тем, как Leaflet попытается его открыть
            setTimeout(() => markerRef.current.openPopup(), 0);
        }
    }, [status, isCurrentSSDLoaded]); // Реагирует строго на смену статуса и готовность данных

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
    if (ssd.idCompany === 3115) companyColor = 'red';
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

    return (
        <Marker
            ref={markerRef}
            icon={divMarkerIcon}
            eventHandlers={eventHandlers}
            key={ssd.idSsd}
            position={coordinates as LatLngExpression}
        >
            {isCurrentSSDLoaded && (
                <PopupLeaflet>
                    <Card
                        className='my-card'
                        size='default'
                        title={(
                            <div>
                                <div>{`${ssdCurrent?.vessel?.nameRus ?? ''} ${date}`}</div>
                                {ssdCurrent?.zoneCurrent?.subareaRus && (
                                    <div
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 'normal',
                                            marginTop: '4px',
                                            color: '#666',
                                        }}
                                    >
                                        {ssdCurrent.zoneCurrent.subareaRus}
                                    </div>
                                )}
                            </div>
                        )}
                        extra={ssd.status}
                    >
                        <ProdInputTab ssd={ssdCurrent} />
                        <ProdOutputTab ssd={ssdCurrent} />
                        <ProdTransportedTab ssd={ssdCurrent} />
                    </Card>
                </PopupLeaflet>
            )}
        </Marker>
    );
});
