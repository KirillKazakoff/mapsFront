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
            <div className='grid'>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--transport-name'>
                    {'Наименование'}
                </Card.Grid>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--transport-total'>
                    {'Всего, тн'}
                </Card.Grid>
            </div>
            {ssd.productionTransport.map((details) => (
                <div className='grid' key={details.name}>
                    <Card.Grid className='grid__cell grid__cell--transport-name'>
                        {details.name}
                    </Card.Grid>
                    <Card.Grid className='grid__cell grid__cell--transport-total'>
                        {details.total}
                    </Card.Grid>
                </div>
            ))}
        </Card>
    );
}
