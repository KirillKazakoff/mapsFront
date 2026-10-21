import React from 'react';
import { observer } from 'mobx-react-lite';
import { SSDFullT } from '../../../../types/backend';

type Props = { ssd: SSDFullT };

export const TitleTab = observer(({ ssd }: Props) => {
    if (!ssd) return null;

    const styleFooter = {
        fontSize: '14px',
        fontWeight: 'normal',
        marginTop: '4px',
        color: '#666',
    };
    const isZoneArrival = ssd?.zoneArrival;

    return (
        <div>
            <div>{`${ssd?.vessel?.nameRus ?? ''} / ${ssd.dateSsd} / ${ssd.company.nameRus}`}</div>
            {ssd?.zoneCurrent?.subareaRus && (
                <>
                    <div
                        style={{
                            ...styleFooter,
                            color: 'black',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    >
                        {ssd.zoneCurrent.subareaRus}
                    </div>
                    {isZoneArrival ? (
                        <>
                            <div
                                style={{
                                    ...styleFooter,
                                    marginTop: '12px',
                                }}
                            >
                                {`Пункт следования: ${ssd.zoneArrival.subareaRus}`}
                            </div>
                            <div style={styleFooter}>
                                {`Дата прибытия: ${ssd.dateArrival}`}
                            </div>
                        </>
                    ) : null}
                </>
            )}
        </div>
    );
});
