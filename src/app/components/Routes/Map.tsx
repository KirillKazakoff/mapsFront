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

    const markersMain = Object.values(ssdLast).map((ssd) => {
        if (!ssd.idSsd || isSSDHiden) return null;
        return <MarkerSSD key={ssd.idSsd} ssd={ssd} />;
    });

    const markersHistory = Object.values(ssdHistory).map((ssd) => {
        if (!ssd.idSsd) return null;
        return <MarkerSSD key={ssd.idSsd} ssd={ssd} />;
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
            </MapContainer>
        </>
    );
});
