import { Card } from 'antd';
import React from 'react';
import { SSDInfoT } from '../../../types/models';

type Props = { ssd: SSDInfoT };

export default function ProdOutputTab({ ssd }: Props) {
    if (ssd.productionDetails.length === 0) return null;

    return (
        <Card type='inner' title='Выпуск рыбопродукции'>
            {ssd.productionDetails.map((details) => (
                <div key={`${details.name} ${details.sort}`} className='control'>
                    <div className='field__title'>{`${details.name}`}</div>
                    <div className='field__value'>{details.total}</div>
                </div>
            ))}
        </Card>
    );
}
