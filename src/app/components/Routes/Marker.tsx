import { Card } from 'antd';
import {
    divIcon, Icon, LatLngExpression, LeafletEventHandlerFnMap,
} from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { dateDb } from '../../utils/date';
import { parseCoordinates } from '../../utils/parseCoordinates';
import ProdInputTab from './PopupTabs/ProdInputTab';
import ProdOutputTab from './PopupTabs/ProdOutputTab';
import { SSDCommonT, SSDFullT } from '../../../types/backend';
import { api } from '../../api/api';
import ProdTransportedTab from './PopupTabs/ProdTransportedTab';

type Props = { ssd: SSDCommonT };

export default function MarkerSSD({ ssd }: Props) {
    const [ssdFull, setSsdFull] = useState<SSDFullT>(null);

    const coordinates = parseCoordinates(ssd.coordinates);

    if (!coordinates) {
        return null;
    }
    const date = dateDb.fromDb(ssd.dateSsd);

    const eventHandlers: LeafletEventHandlerFnMap = {
        click: async () => {
            const res = await api.get.SSDById(ssd.idSsd);
            setSsdFull(res);
        },
    };

    let companyColor = 'green';
    if (ssd.idCompany === 3115) companyColor = 'red';
    if (ssd.idCompany === 3301) companyColor = 'blue';

    const divMarkerIcon = divIcon({
        html: `<div class='marker__wrapper svg--scale'>
                    <div class='marker__title'>${ssd?.vessel?.nameRus}</div>
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
            key={ssd.idCompany}
            position={coordinates as LatLngExpression}
        >
            <Popup>
                <Card
                    className='my-card'
                    size='default'
                    title={(
                        <div>
                            <div>{`${ssd?.vessel?.nameRus} ${date}`}</div>
                            {ssdFull?.zoneCurrent?.subareaRus && (
                                <div
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 'normal',
                                        marginTop: '4px',
                                        color: '#666',
                                    }}
                                >
                                    {ssdFull.zoneCurrent.subareaRus}
                                </div>
                            )}
                        </div>
                    )}
                    extra={ssd.status}
                >
                    <ProdInputTab ssd={ssdFull} />
                    <ProdOutputTab ssd={ssdFull} />
                    <ProdTransportedTab ssd={ssdFull} />
                </Card>
            </Popup>
        </Marker>
    );
}
