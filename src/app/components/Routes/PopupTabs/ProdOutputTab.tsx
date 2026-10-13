import { Card } from 'antd';
import React from 'react';
import { SSDFullT } from '../../../../types/backend';

type Props = { ssd: SSDFullT };

export default function ProdOutputTab({ ssd }: Props) {
    if (!ssd) return null;
    if (ssd.products.length === 0) return null;

    return (
        <Card
            type='inner' size='small'
            title='Выпуск рыбопродукции'
        >
            <div className='grid'>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--output-name'>
                    {'Наименование'}
                </Card.Grid>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--output-amount'>
                    {'Выпуск'}
                </Card.Grid>
            </div>

            {ssd.products.map((product) => (
                <div className='grid' key={product.id}>
                    <Card.Grid className='grid__cell grid__cell--output-name'>{`${product.product.nameRus}`}</Card.Grid>
                    <Card.Grid className='grid__cell grid__cell--output-amount'>{`${product.amount}`}</Card.Grid>
                </div>
            ))}
        </Card>
    );
}
