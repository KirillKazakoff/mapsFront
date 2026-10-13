import React from 'react';
import { Card } from 'antd';
import { SSDFullT } from '../../../../types/backend';

type Props = { ssd: SSDFullT };

export default function ProdTransportedTab({ ssd }: Props) {
    if (!ssd) return null;
    if (ssd.productsTransported.length === 0) return null;

    return (
        <Card
            size='small' type='inner'
            title='Транспортируемая рыбопродукция'
        >
            <div className='grid'>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--output-name'>
                    {'Наименование'}
                </Card.Grid>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--output-amount'>
                    {'Всего, тн'}
                </Card.Grid>
            </div>
            {ssd.productsTransported.map((p) => (
                <div className='grid' key={p.id}>
                    <Card.Grid className='grid__cell grid__cell--output-name'>
                        {p.product.nameRus}
                    </Card.Grid>
                    <Card.Grid className='grid__cell grid__cell--output-amount'>
                        {p.amount}
                    </Card.Grid>
                </div>
            ))}
        </Card>
    );
}
