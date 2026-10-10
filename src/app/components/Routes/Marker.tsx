import { Card } from 'antd';
import { divIcon, Icon, LatLngExpression, LeafletEventHandlerFnMap } from 'leaflet';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { dateDb } from '../../utils/date';
import { parseCoordinates } from '../../utils/parseCoordinates';
import BaitTab from './PopupTabs/BaitTab';
import ProdInputTab from './PopupTabs/ProdInputTab';
import ProdOutputTab from './PopupTabs/ProdOutputTab';
import ProdTransportedTab from './PopupTabs/ProdTransportedTab';
import ReserveTab from './PopupTabs/ReserveTab';
import { SSDCommonT } from '../../../types/backend';

type Props = { ssd: SSDCommonT };

export default function MarkerSSD({ ssd }: Props) {
    const coordinates = parseCoordinates(ssd.coordinates);
    const date = dateDb.fromDb(ssd.dateSsd);

    const eventHandlers: LeafletEventHandlerFnMap = {
        click: () => console.log(ssd),
    };

    let companyColor = '';
    if (ssd.idCompany === 3115) {
        companyColor = 'red';
    } else if (ssd.idCompany === 3301) {
        companyColor = 'blue';
    } else {
        companyColor = 'green';
    }

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
            position={coordinates as LatLngExpression}>
            <Popup>
                <Card
                    className="my-card"
                    title={`${ssd?.vessel?.nameRus} ${date} \n${ssd.idZoneCurrent}`}
                    extra={`NEED TO ADD`}>
                    {/* <ProdInputTab ssd={ssd} />
                    <ProdOutputTab ssd={ssd} />
                    <ProdTransportedTab ssd={ssd} />
                    <BaitTab ssd={ssd} />
                    <ReserveTab ssd={ssd} /> */}
                </Card>
            </Popup>
        </Marker>
    );
}

// {
//     "compilerOptions": {
//         "allowSyntheticDefaultImports": true,
//         "noImplicitAny": true,
//         "moduleResolution": "node16",
//         "sourceMap": true,
//         "module": "node16",
//         "target": "esnext",
//         "jsx": "react",
//         "noEmit": false,
//         "noImplicitThis": true,
//         "strictNullChecks": false,
//         "lib": [
//             "es6",
//             "dom",
//             "dom.iterable",
//             "es2015.generator",
//             "esnext",
//             "esnext.array",
//         ],
//         "resolveJsonModule": true,
//     },
//     "exclude": [
//         "node_modules"
//     ]
// }
