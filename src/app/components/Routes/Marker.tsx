import { Card } from 'antd';
import {
    divIcon, Icon, LatLngExpression, LeafletEventHandlerFnMap,
} from 'leaflet';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { SSDInfoT } from '../../types/models';
import { dateDb } from '../../utils/date';
import { getCoordinates } from '../../utils/getCoordinates';
import BaitTab from './PopupTabs/BaitTab';
import ProdInputTab from './PopupTabs/ProdInputTab';
import ProdOutputTab from './PopupTabs/ProdOutputTab';
import ProdTransportedTab from './PopupTabs/ProdTransportedTab';
import ReserveTab from './PopupTabs/ReserveTab';

type Props = { ssdArray: SSDInfoT[] };

export default function MarkerSSD({ ssdArray }: Props) {
    const ssd = ssdArray[0];
    const coordinates = getCoordinates(ssd.ssd.coordinates);
    const date = dateDb.fromDb(ssd.ssd.date);

    const eventHandlers: LeafletEventHandlerFnMap = {
        click: () => console.log(ssd),
    };

    let companyColor = '';
    if (ssd.ssd.company === 'ТРК') companyColor = 'red';
    if (ssd.ssd.company === 'МСИ') companyColor = 'blue';

    const divMarkerIcon = divIcon({
        html: `<div class='marker__wrapper svg--scale'>
                    <div class='marker__title'>${ssd.ssd.vessel}</div>
                    <img
                        class='svg svg-marker marker-${companyColor}'
                        src='./svg/location-pin.svg'
                        alt='remove-icon'
                    />
                </div>`,
    });

    return (
        <Marker
            icon={divMarkerIcon}
            eventHandlers={eventHandlers}
            key={ssd.ssd.id}
            position={coordinates as LatLngExpression}
        >
            <Popup>
                <Card
                    className='my-card'
                    title={`${ssd.ssd.vessel} ${date} \n${ssd.ssd.catch_zone}`}
                    extra={`${ssd.ssd.status}`}
                >
                    <ProdInputTab ssd={ssd} />
                    <ProdOutputTab ssd={ssd} />
                    <ProdTransportedTab ssd={ssd} />
                    <BaitTab ssd={ssd} />
                    <ReserveTab ssd={ssd} />
                </Card>
            </Popup>
        </Marker>
    );
}
