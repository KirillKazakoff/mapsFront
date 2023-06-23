import { Card } from 'antd';
import { LatLngExpression, LeafletEventHandlerFnMap } from 'leaflet';
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

    const productionDetails = ssd.productionDetails.map((details) => (
        <div className='control'>
            <div className='field__title'>{`${details.name} ${details.sort}`}</div>
            <div className='field__value'>{details.total}</div>
        </div>
    ));

    return (
        <Marker
            eventHandlers={eventHandlers}
            key={ssd.ssd.id}
            position={coordinates as LatLngExpression}
        >
            <Popup>
                <Card title={`${ssd.ssd.vessel} ${date} \n${ssd.ssd.catch_zone}`}>
                    <Card type='inner' title='Вылов продукции'>
                        <h3 className='card__section__title'>Вылов рыбопродукции</h3>
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
                        <h3 className='card__section__title'>Выпуск рыбопродукции</h3>
                        <div className='control'>
                            {ssd.productionDetails.map((details) => (
                                <div className='control'>
                                    <div className='field__title'>{`${details.name} ${details.sort}`}</div>
                                    <div className='field__value'>{details.total}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card type='inner' title='Нажива'>
                        <div className='field__title'>{ssd?.bait?.name}</div>
                        <div className='field__value'>{ssd?.bait?.total}</div>
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
    );
}

// import { LeafletEventHandlerFnMap } from 'leaflet';
// import React from 'react';
// import { Marker } from 'react-leaflet';
// import { SSDInfoT } from '../../types/models';
// import { dateDb } from '../../utils/date';
// import { getCoordinates } from '../../utils/getCoordinates';

// type Props = { ssdArray: SSDInfoT[] };

// export default function MarkerSSD({ ssdArray }: Props) {
//     const ssd = ssdArray[0];
//     const coordinates = getCoordinates(ssd.ssd.coordinates);

//     const eventHandlers: LeafletEventHandlerFnMap = {
//         click: () => console.log(ssd),
//     };

//     const productionDetails = ssd.productionDetails.length > 0
//         ? ssd.productionDetails.map((details) => {
//             return (
//                 <div className='control'>
//                     <div className='field__title'>
//                         {`${details.name} ${details.sort}`}
//                     </div>
//                     <div className='field__value'>{details.total}</div>
//                 </div>
//             );
//         })
//         : null;

//     const contentList: Record<string, React.ReactNode> = {
//         tab1: (
//             <div className='card__tab'>
//                 <div className='card__section'>
//                     <h3 className='card__section__title'>Вылов рыбопродукции</h3>
//                     <div className='control'>
//                         <div className='field__title'>
//                             {ssd?.productionInput?.name}
//                         </div>
//                         <div className='field__value'>
//                             {ssd?.productionInput?.total}
//                         </div>
//                     </div>
//                 </div>
//                 <div className='card__section'>
//                     <h3 className='card__section__title'>Выпуск рыбопродукции</h3>
//                     <div className='ssd_prod-details fields-wrapper'>
//                         {productionDetails}
//                     </div>
//                 </div>
//             </div>
//         ),
//         tab2: (
//             <div className='card__tab'>
//                 <div className='control'>
//                     <div className='field__title'>Подзона</div>
//                     <div className='field__value'>{ssd.ssd.catch_zone}</div>
//                 </div>
//                 <div className='control'>
//                     <div className='field__title'>Дата</div>
//                     <div className='field__value'>
//                         {dateDb.fromDb(ssd.ssd.date)}
//                     </div>
//                 </div>
//                 <div className='control'>
//                     <div className='field__title'>Дата</div>
//                     <div className='field__value'>
//                         {dateDb.fromDb(ssd.ssd.date)}
//                     </div>
//                 </div>
//             </div>
//         ),
//     };

//     return <Marker />;
// }
