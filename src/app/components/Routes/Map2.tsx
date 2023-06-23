import { Card } from 'antd';
import { LatLngExpression, LeafletEventHandlerFnMap } from 'leaflet';
import React, { useEffect, useState } from 'react';
import {
    MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet';
import { middleware } from '../../api/middleware';
import { SSDByVesselT } from '../../types/types';
import { dateDb } from '../../utils/date';
import { getCoordinates } from '../../utils/getCoordinates';

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
        const latestSsd = ssd[0];
        const coordinates = getCoordinates(latestSsd.ssd.coordinates);

        const eventHandlers: LeafletEventHandlerFnMap = {
            click: () => console.log(ssd[0]),
        };

        const productionDetails = latestSsd.productionDetails.length > 0
            ? latestSsd.productionDetails.map((details) => {
                return (
                    <div className='control'>
                        <div className='field__title'>
                            {`${details.name} ${details.sort}`}
                        </div>
                        <div className='field__value'>{details.total}</div>
                    </div>
                );
            })
            : null;

        const contentList: Record<string, React.ReactNode> = {
            tab1: (
                <div className='card__tab'>
                    <div className='card__section'>
                        <h3 className='card__section__title'>Вылов рыбопродукции</h3>
                        <div className='control'>
                            <div className='field__title'>
                                {latestSsd?.productionInput?.name}
                            </div>
                            <div className='field__value'>
                                {latestSsd?.productionInput?.total}
                            </div>
                        </div>
                    </div>
                    <div className='card__section'>
                        <h3 className='card__section__title'>Выпуск рыбопродукции</h3>
                        <div className='ssd_prod-details fields-wrapper'>
                            {productionDetails}
                        </div>
                    </div>
                </div>
            ),
            tab2: (
                <div className='card__tab'>
                    <div className='control'>
                        <div className='field__title'>Подзона</div>
                        <div className='field__value'>{latestSsd.ssd.catch_zone}</div>
                    </div>
                    <div className='control'>
                        <div className='field__title'>Дата</div>
                        <div className='field__value'>
                            {dateDb.fromDb(latestSsd.ssd.date)}
                        </div>
                    </div>
                    <div className='control'>
                        <div className='field__title'>Дата</div>
                        <div className='field__value'>
                            {dateDb.fromDb(latestSsd.ssd.date)}
                        </div>
                    </div>
                </div>
            ),
        };

        return (
            <Marker
                eventHandlers={eventHandlers}
                key={latestSsd.ssd.id}
                position={coordinates as LatLngExpression}
            >
                <Popup>
                    <Card />
                </Popup>
                {/* <Popup>
                    <div className='ssd'>
                        <h2 className='ssd__vessel'>{latestSsd.ssd.vessel}</h2>
                        <div className='ssd__zone'>{latestSsd.ssd.catch_zone}</div>
                        <div className='ssd__date'>{latestSsd.ssd.date}</div>
                        <div className='ssd__prod-input prod-input__wrapper'>
                            <div className='prod-input__name'>
                                {latestSsd?.productionInput?.name}
                            </div>
                            <div className='prod-input__amount'>
                                {latestSsd?.productionInput?.total}
                            </div>
                        </div>
                    </div>
                </Popup> */}
            </Marker>
        );
    });

    return (
        <MapContainer
            id='map' center={position}
            zoom={4}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {markers}
        </MapContainer>
    );
}
