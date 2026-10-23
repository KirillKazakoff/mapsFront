/* eslint-disable no-param-reassign */
import { LatLngExpression } from 'leaflet';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { observer } from 'mobx-react-lite';
import { MarkerSSD } from './Marker';
import { api } from '../../api/api';
import { Popup } from './Popup/Popup';

import { ssdStore } from '../../stores/ssdStore';
import { PopupButtons } from './Popup/PopupButtons/PopupButtons';
import { buttonsStore } from '../../stores/buttonsStore';
import { HistoryPath } from './HistoryPath/HistoryPath';
import { jitterCoordinates } from '../../utils/jitterCoordinates';
import { groupify } from '../../utils/groupify';
import { getUniqueColor } from './HistoryPath/getUniqueColor';

export type HistoryT = {
    coords: [number, number];
    date: string;
    vesselId: number;
};

export const Map = observer(() => {
    const position: LatLngExpression = [55.26, 146.44];
    const { isLoading, ssdLast, ssdHistory } = ssdStore;
    const { isBurgerOpened, isSSDHiden } = buttonsStore;

    useEffect(() => {
        const getLastSSD = async () => {
            const ssdObj = await api.get.lastSSD();
            ssdStore.setCommonSSD(ssdObj);
        };
        getLastSSD();
    }, []);

    if (isLoading) return null;

    // 1. Применяем смещение для основных судов
    const jitteredMainSSD = jitterCoordinates(ssdLast);
    const markersMain = jitteredMainSSD.map((ssd) => {
        if (!ssd.idSsd || isSSDHiden) return null;
        // Передаем измененные координаты внутрь маркера (шаг 3)
        return (
            <MarkerSSD
                key={`main-${ssd.idSsd}`}
                ssd={ssd}
                adjustedCoords={ssd.adjustedCoordinates}
            />
        );
    });

    // 2. Применяем смещение для истории
    const jitteredHistorySSD = jitterCoordinates(Object.values(ssdHistory));
    const markersHistory = jitteredHistorySSD.map((ssd) => {
        const color = getUniqueColor(ssd.idVessel);

        if (!ssd.idSsd) return null;
        return (
            <MarkerSSD
                key={`hist-${ssd.idSsd}`}
                ssd={ssd}
                adjustedCoords={ssd.adjustedCoordinates}
                color={color}
            />
        );
    });

    const historyObj = jitteredHistorySSD.reduce<{
        [key: number]: HistoryT[];
    }>((total, ssd) => {
        const objId = groupify(total, [], ssd.idVessel);
        objId.push({
            coords: ssd.adjustedCoordinates,
            date: ssd.dateSsd,
            vesselId: ssd.idVessel,
        });
        return total;
    }, []);

    const historyPathes = Object.entries(historyObj).map(([key, history]) => {
        return <HistoryPath key={key} history={history} />;
    });

    return (
        <>
            <PopupButtons />
            <Popup
                isVisible={isBurgerOpened}
                onClose={() => buttonsStore.setBurger(false)}
            />
            <MapContainer
                id='map' center={position}
                zoom={5}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {markersMain}
                {markersHistory}
                {historyPathes}
            </MapContainer>
        </>
    );
});
