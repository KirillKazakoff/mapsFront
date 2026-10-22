/* eslint-disable max-len */
import React from 'react';
import { Polyline, Marker } from 'react-leaflet';
import { divIcon, LatLngExpression } from 'leaflet';
import { nanoid } from 'nanoid';
import type { HistoryT } from '../Map';
import { getUniqueColor } from './getUniqueColor';

type Props = { history: HistoryT[] };

export const HistoryPath: React.FC<Props> = ({ history }) => {
    const historySorted = history.toSorted((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    const historyCoords = historySorted.map((h) => h.coords);

    // Если точек меньше двух, трек и вектор построить нельзя
    if (historySorted.length < 2) return null;
    const pathColor = getUniqueColor(history[0].vesselId);

    const historyLength = history.length;

    // Генерируем маркеры-номера для каждой точки ССД
    const numberMarkers = historySorted.map((point, index) => {
        // Расчет индекса с конца: последний элемент массива получит номер 1
        const pointIndex = index + 1;

        let bgColor = '#1890ff';
        let size = 18; // Размер по умолчанию
        let zIndex = 500;

        // Стили для первой точки в массиве
        if (index === 0) {
            bgColor = '#52c41a';
            size = 22;
            zIndex = 600;
        } else if (index === historyLength - 1) {
            bgColor = '#ff4d4f';
            size = 22;
            zIndex = 600;
        }

        // Круглая иконка с цифрой внутри
        const numberIcon = divIcon({
            className: `vessel-path-number-${pointIndex}`,
            html: `
                <div style="
                    width: ${size}px; 
                    height: ${size}px; 
                    background-color: ${bgColor}; 
                    border: 2px solid #ffffff; 
                    border-radius: 50%; 
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    font-size: ${size > 18 ? '11px' : '10px'};
                    font-weight: bold;
                    font-family: Arial, sans-serif;
                ">
                    ${pointIndex}
                </div>
            `,
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2], // Центрируем по координате ССД
        });

        return (
            <Marker
                key={nanoid()}
                position={point.coords as LatLngExpression}
                icon={numberIcon}
                interactive={false}
                zIndexOffset={zIndex}
            />
        );
    });

    // Ломаная линия пути судна за весь период
    return (
        <>
            <Polyline
                positions={historyCoords as LatLngExpression[]}
                pathOptions={{
                    color: pathColor,
                    weight: 3,
                    opacity: 0.6, // уменьшил прозрачность линии, чтобы цифры лучше читались
                }}
            />

            {numberMarkers}
        </>
    );
};

// /* eslint-disable max-len */
// import React from 'react';
// import { Polyline, Marker } from 'react-leaflet';
// import { divIcon, LatLngExpression } from 'leaflet';
// import { nanoid } from 'nanoid';

// interface VesselPathProps {
//     ssdPoints: [number, number][]; // Координаты ССД по порядку: [[lat, lng], [lat, lng]...]
// }

// export const HistoryPath: React.FC<VesselPathProps> = ({ ssdPoints }) => {
//     // Если точек меньше двух, трек и вектор построить нельзя
//     if (ssdPoints.length < 2) return null;

//     const totalPoints = ssdPoints.length;

//     // Генерируем маркеры-номера для каждой точки ССД
//     const numberMarkers = ssdPoints.map((point, index) => {
//         const orderNumber = index + 1;

//         let bgColor = '#1890ff'; // Синий цвет для промежуточных точек
//         let size = 18; // Размер по умолчанию
//         let zIndex = 500;

//         // Стили для первой точки (Старт)
//         if (index === 0) {
//             bgColor = '#ff4d4f';
//             size = 22;
//             zIndex = 600; // Старт и финиш выше приоритетом на карте
//         } else if (index === totalPoints - 1) {
//             bgColor = '#52c41a';
//             size = 22;
//             zIndex = 600;
//         }

//         // Создаем круглую иконку с цифрой внутри
//         const numberIcon = divIcon({
//             className: `vessel-path-number-${orderNumber}`,
//             html: `
//                 <div style="
//                     width: ${size}px;
//                     height: ${size}px;
//                     background-color: ${bgColor};
//                     border: 2px solid #ffffff;
//                     border-radius: 50%;
//                     box-shadow: 0 2px 6px rgba(0,0,0,0.3);
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     color: #ffffff;
//                     font-size: ${size > 18 ? '11px' : '10px'};
//                     font-weight: bold;
//                     font-family: Arial, sans-serif;
//                 ">
//                     ${orderNumber}
//                 </div>
//             `,
//             iconSize: [size, size],
//             iconAnchor: [size / 2, size / 2], // Центрируем строго по координате ССД
//         });

//         return (
//             <Marker
//                 key={nanoid()}
//                 position={point as LatLngExpression}
//                 icon={numberIcon}
//                 interactive={false} // Чтобы не мешали кликать по основным маркерам судов
//                 zIndexOffset={zIndex}
//             />
//         );
//     });

//     return (
//         <>
//             {/* Ломаная линия пути судна за весь период */}
//             <Polyline
//                 positions={ssdPoints as LatLngExpression[]}
//                 pathOptions={{
//                     color: '#1890ff',
//                     weight: 3,
//                     opacity: 0.6, // уменьшил прозрачность линии, чтобы цифры лучше читались
//                 }}
//             />

//             {numberMarkers}
//         </>
//     );
// };
