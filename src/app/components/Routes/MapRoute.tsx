import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { middleware } from '../../api/middleware';

export const MapRoute = observer(() => {
    useEffect(() => {
        const promise = async () => {
            const map = L.map('map').setView([55.26, 146.44], 5);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);

            const ssdObj = await middleware.initSsdByVessels();
            const markers: L.Marker[] = [];
            Object.entries(ssdObj).forEach(([vessel, ssd]) => {
                const latestSsd = ssd[0].ssd;
                const coordinates = latestSsd.coordinates
                    .trim()
                    .split(' ')
                    .map((val) => +val);

                const marker = L.marker(coordinates as LatLngExpression);
                marker.addTo(map);
                marker.bindPopup(vessel);
                markers.push(marker);
            });
        };

        promise();
    });

    return <div>MapRoute</div>;
});
