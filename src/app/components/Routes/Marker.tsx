import { Card } from 'antd';
import L, {
    divIcon, Icon, LatLngExpression, LeafletEventHandlerFnMap,
} from 'leaflet';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { SSDInfoT } from '../../types/models';
import { dateDb } from '../../utils/date';
import { getCoordinates } from '../../utils/getCoordinates';

type Props = { ssdArray: SSDInfoT[] };

export default function MarkerSSD({ ssdArray }: Props) {
    const ssd = ssdArray[0];
    const coordinates = getCoordinates(ssd.ssd.coordinates);
    const date = dateDb.fromDb(ssd.ssd.date);

    const eventHandlers: LeafletEventHandlerFnMap = {
        click: () => console.log(ssd),
    };

    const isTransport = ssd.ssd.company !== 'ТРК' && ssd.ssd.company !== 'МСИ';
    let companyColor = '';
    if (ssd.ssd.company === 'ТРК') companyColor = 'red';
    if (ssd.ssd.company === 'МСИ') companyColor = 'blue';

    console.log(ssd.ssd.status);

    const customIcon = new Icon({
        className: `marker-${companyColor}`,
        iconUrl: isTransport ? './svg/cargo.svg' : './svg/location-pin.svg',
        iconSize: [45, 45],
    });

    const divMarkerIcon = divIcon({
        html: `<div class='marker__wrapper'>
                    <div class='marker__title'>${ssd.ssd.vessel}</div>
                    <img
                        class='svg svg--scale svg-marker marker-${companyColor}'
                        src='./svg/location-pin.svg'
                        alt='remove-icon'
                    />
                </div>`,
    });

    return (
        <div className='marker__wrapper'>
            <div className='marker__title'>{ssd.ssd.vessel}</div>
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
                    >
                        <Card type='inner' title='Вылов продукции'>
                            <div className='control'>
                                <div className='field__title'>
                                    {ssd?.productionInput?.name}
                                </div>
                                <div className='field__value'>
                                    {ssd?.productionInput?.total}
                                </div>
                            </div>
                        </Card>
                        <Card type='inner' title='Выпуск рыбопродукции'>
                            {ssd.productionDetails.map((details) => (
                                <div
                                    key={`${details.name} ${details.sort}`}
                                    className='control'
                                >
                                    <div className='field__title'>{`${details.name}`}</div>
                                    <div className='field__value'>{details.total}</div>
                                </div>
                            ))}
                        </Card>
                        <Card type='inner' title='Нажива'>
                            <div className='control'>
                                <div className='field__title'>{ssd?.bait?.name}</div>
                                <div className='field__value'>{ssd?.bait?.total}</div>
                            </div>
                        </Card>
                        <Card type='inner' title='Резерв топлива'>
                            <div className='control'>
                                <div className='field__title'>{'Топливо'}</div>
                                <div className='field__value'>{ssd.reserve.fuel}</div>
                            </div>
                            <div className='control'>
                                <div className='field__title'>{'Вода-запас'}</div>
                                <div className='field__value'>{ssd.reserve.water}</div>
                            </div>
                        </Card>
                    </Card>
                </Popup>
            </Marker>
        </div>
    );
}
