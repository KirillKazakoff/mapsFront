import { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import {
    MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet';
import { middleware } from '../../api/middleware';
import { SSDByVesselT } from '../../types/types';

export default function Map2() {
    const position: LatLngExpression = [55.26, 146.44];
    const [state, setState] = useState<SSDByVesselT>(null);

    useEffect(() => {
        const getSsdObj = async () => {
            const ssdObj = await middleware.initSsdByVessels();
            setState(ssdObj);
        };
        getSsdObj();
    }, []);

    if (!state) return null;
    const markers = Object.entries(state).map(([vessel, ssd]) => {
        const latestSsd = ssd[0].ssd;
        const coordinates = latestSsd.coordinates
            .trim()
            .split(' ')
            .map((val) => +val);

        return (
            <Marker key={latestSsd.id} position={coordinates as LatLngExpression}>
                <Popup>{vessel}</Popup>
            </Marker>
        );
    });

    return (
        <MapContainer center={position} zoom={19}>
            <TileLayer
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {markers}
        </MapContainer>
    );
}
