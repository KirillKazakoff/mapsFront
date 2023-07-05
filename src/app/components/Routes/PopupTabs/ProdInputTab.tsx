import { Card } from 'antd';
import React from 'react';
import { SSDInfoT } from '../../../types/models';

type Props = { ssd: SSDInfoT };

export default function ProdInputTab({ ssd }: Props) {
    if (!ssd.productionInput) return null;

    return (
        <Card
            type='inner' size='small'
            title='Вылов продукции'
        >
            <div className='control'>
                <div className='field__title'>{ssd.productionInput.name}</div>
                <div className='field__value'>{ssd.productionInput.total}</div>
            </div>
        </Card>
    );
}
