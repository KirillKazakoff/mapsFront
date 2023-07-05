import { Card } from 'antd';
import React from 'react';
import { SSDInfoT } from '../../../types/models';

type Props = { ssd: SSDInfoT };

export default function ReserveTab({ ssd }: Props) {
    if (!ssd.reserve.id_ssd) return null;

    return (
        <Card
            size='small' type='inner'
            title='Резерв топлива'
        >
            <div className='control'>
                <div className='field__title'>{'Топливо'}</div>
                <div className='field__value'>{ssd.reserve.fuel}</div>
            </div>
            <div className='control'>
                <div className='field__title'>{'Вода-запас'}</div>
                <div className='field__value'>{ssd.reserve.water}</div>
            </div>
        </Card>
    );
}
