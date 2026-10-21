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
import { HistoryPath } from './HistoryPath/HistoryPath';
import { jitterCoordinates } from '../../utils/jitterCoordinates';

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

    // 1. Применяем смещение для основных судов
    const jitteredMainSSD = jitterCoordinates(ssdLast);
    const markersMain = jitteredMainSSD.map((ssd) => {
        if (!ssd.idSsd || isSSDHiden) return null;
        // Передаем измененные координаты внутрь маркера (шаг 3)
        return (
            <MarkerSSD
                key={`main-${ssd.idSsd}`}
                ssd={ssd}
                adjustedCoords={ssd.adjustedCoordinates}
            />
        );
    });

    // 2. Применяем смещение для истории
    const jitteredHistorySSD = jitterCoordinates(Object.values(ssdHistory));
    const markersHistory = jitteredHistorySSD.map((ssd) => {
        if (!ssd.idSsd) return null;
        return (
            <MarkerSSD
                key={`hist-${ssd.idSsd}`}
                ssd={ssd}
                adjustedCoords={ssd.adjustedCoordinates}
            />
        );
    });

    // Координаты для линии трека берем тоже смещенные, чтобы линия шла ровно к разнесенным маркерам
    const historyCoordinates = jitteredHistorySSD.map((ssd) => ssd.adjustedCoordinates);

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
                <HistoryPath ssdPoints={historyCoordinates} />
            </MapContainer>
        </>
    );
});

// import { LatLngExpression } from 'leaflet';
// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import { observer } from 'mobx-react-lite';
// import { MarkerSSD } from './Marker';
// import { api } from '../../api/api';
// import { Popup } from './Popup/Popup';

// import { ssdStore } from '../../stores/ssdStore';
// import { PopupButtons } from './Popup/PopupButtons/PopupButtons';
// import { buttonsStore } from '../../stores/buttonsStore';
// import { parseCoordinates } from '../../utils/parseCoordinates';
// import { HistoryPath } from './HistoryPath/HistoryPath';

// export const Map = observer(() => {
//     const position: LatLngExpression = [55.26, 146.44];
//     const { isLoading, ssdLast, ssdHistory } = ssdStore;
//     const { isBurgerOpened, isSSDHiden } = buttonsStore;

//     useEffect(() => {
//         const getLastSSD = async () => {
//             const ssdObj = await api.get.lastSSD();

//             ssdStore.setCommonSSD(ssdObj);
//         };
//         getLastSSD();
//     }, []);

//     if (isLoading) return null;

//     const markersMain = Object.values(ssdLast).map((ssd) => {
//         if (!ssd.idSsd || isSSDHiden) return null;
//         return <MarkerSSD key={ssd.idSsd} ssd={ssd} />;
//     });

//     const markersHistory = Object.values(ssdHistory).map((ssd) => {
//         if (!ssd.idSsd) return null;
//         return <MarkerSSD key={ssd.idSsd} ssd={ssd} />;
//     });

//     const historyCoordinates = ssdHistory.map((ssd) => {
//         if (!ssd?.coordinates) return null;
//         return parseCoordinates(ssd.coordinates);
//     });

//     return (
//         <>
//             <PopupButtons />
//             <Popup
//                 isVisible={isBurgerOpened}
//                 onClose={() => buttonsStore.setBurger(false)}
//             />
//             <MapContainer
//                 id='map' center={position}
//                 zoom={5}
//             >
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//                 />

//                 {markersMain}
//                 {markersHistory}
//                 <HistoryPath ssdPoints={historyCoordinates} />
//             </MapContainer>
//         </>
//     );
// });
