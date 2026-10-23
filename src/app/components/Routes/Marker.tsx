import React from 'react';
import { Card } from 'antd';
import { LatLngExpression } from 'leaflet';
import { Marker, Popup as PopupLeaflet } from 'react-leaflet';
import { observer } from 'mobx-react-lite';
import ProdInputTab from './PopupTabs/ProdInputTab';
import ProdOutputTab from './PopupTabs/ProdOutputTab';
import { SSDCommonT } from '../../../types/backend';
import ProdTransportedTab from './PopupTabs/ProdTransportedTab';
import { useMarker } from './useMarker';
import { TitleTab } from './PopupTabs/TitleTab';

type Props = { ssd: SSDCommonT; adjustedCoords: [number, number]; color?: string };

export const MarkerSSD = observer(({ ssd, adjustedCoords, color }: Props) => {
    const settings = useMarker({ ssd, color });
    if (!settings.coordinates) return null;
    // prettier-ignore
    const {
        ssdCurrent, ref, divMarkerIcon, eventHandlers, isCurrentSSDLoaded,
    } = settings;

    return (
        <Marker
            ref={ref}
            icon={divMarkerIcon}
            eventHandlers={eventHandlers}
            key={ssd.idSsd}
            position={adjustedCoords as LatLngExpression}
        >
            {isCurrentSSDLoaded && (
                <PopupLeaflet>
                    <Card
                        className='my-card'
                        size='default'
                        styles={{
                            body: {
                                maxHeight: '500px',
                                overflowY: 'auto',
                            },
                        }}
                        title={<TitleTab ssd={ssdCurrent} />}
                        extra={ssd.status}
                    >
                        <ProdInputTab ssd={ssdCurrent} />
                        <ProdOutputTab ssd={ssdCurrent} />
                        <ProdTransportedTab ssd={ssdCurrent} />
                    </Card>
                </PopupLeaflet>
            )}
        </Marker>
    );
});
