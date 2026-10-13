import { Card } from 'antd';
import React from 'react';
import { SSDFullT } from '../../../../types/backend';

type Props = { ssd: SSDFullT };

export default function ProdInputTab({ ssd }: Props) {
    if (!ssd) return null;
    if (ssd.catches.length === 0) return null;

    return (
        <Card
            type='inner' size='small'
            title='Вылов рыбопродукции'
        >
            <div className='grid'>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--output-name'>
                    {'Наименование'}
                </Card.Grid>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--output-amount'>
                    {'Объем'}
                </Card.Grid>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--output-subzone'>
                    {'Подзона'}
                </Card.Grid>
            </div>

            {ssd.catches.map((c) => (
                <div className='grid' key={c.id}>
                    <Card.Grid className='grid__cell grid__cell--output-name'>{`${c.vbr.nameRus}`}</Card.Grid>
                    <Card.Grid className='grid__cell grid__cell--output-amount'>{`${c.amount}`}</Card.Grid>
                    <Card.Grid className='grid__cell grid__cell--output-subzone'>{`${c.subzone.subareaRus}`}</Card.Grid>
                </div>
            ))}
        </Card>
    );
}
