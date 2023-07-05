import React from 'react';
import { Card } from 'antd';
import { SSDInfoT } from '../../../types/models';

type Props = { ssd: SSDInfoT };

export default function ProdTransportedTab({ ssd }: Props) {
    if (ssd.productionTransport.length === 0) return null;

    return (
        <Card
            size='small' type='inner'
            title='Транспортируемая рыбопродукция'
        >
            {ssd.productionTransport.map((details) => (
                <div key={`${details.name}`} className='control'>
                    <div className='field__title'>{`${details.name}`}</div>
                    <div className='field__value'>{details.total}</div>
                </div>
            ))}
        </Card>
    );
}
