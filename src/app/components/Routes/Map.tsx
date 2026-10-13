import { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import MarkerSSD from './Marker';
import { SSDCommonT } from '../../../types/backend';
import { api } from '../../api/api';

export default function Map() {
    const position: LatLngExpression = [55.26, 146.44];
    const [state, setState] = useState<SSDCommonT[]>(null);

    useEffect(() => {
        const getSsdObj = async () => {
            const ssdObj = await api.get.lastSSD();

            setState(ssdObj);
        };
        getSsdObj();
    }, []);

    if (!state) return null;
    const markers = Object.values(state).map((ssd) => {
        if (!ssd.idSsd) return null;
        return <MarkerSSD key={ssd.idSsd} ssd={ssd} />;
    });

    return (
        <MapContainer
            id='map' center={position}
            zoom={5}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {markers}
        </MapContainer>
    );
}
