import { Card } from 'antd';
import React from 'react';
import { SSDInfoT } from '../../../types/models';

type Props = { ssd: SSDInfoT };

export default function ProdOutputTab({ ssd }: Props) {
    if (ssd.productionDetails.length === 0) return null;

    return (
        <Card
            type='inner' size='small'
            title='Выпуск рыбопродукции'
        >
            <div className='grid'>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--output-name'>
                    {'Наименование'}
                </Card.Grid>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--output-sort'>
                    {'Сорт'}
                </Card.Grid>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--output-current'>
                    {'Выпуск'}
                </Card.Grid>
                <Card.Grid className='grid__cell grid__cell-title grid__cell--output-total'>
                    {'Бортовая'}
                </Card.Grid>
            </div>
            {ssd.productionDetails.map((details) => (
                <div className='grid' key={`${details.name} ${details.sort}`}>
                    <Card.Grid className='grid__cell grid__cell--output-name'>{`${details.name}`}</Card.Grid>
                    <Card.Grid className='grid__cell grid__cell--output-sort'>{`${details.sort}`}</Card.Grid>
                    <Card.Grid className='grid__cell grid__cell--output-current'>{`${details.current}`}</Card.Grid>
                    <Card.Grid className='grid__cell grid__cell--output-total'>{`${details.total}`}</Card.Grid>
                </div>
            ))}
        </Card>
    );
}
