import { Card } from 'antd';
import React from 'react';
import { SSDInfoT } from '../../../types/models';

type Props = { ssd: SSDInfoT };

export default function BaitTab({ ssd }: Props) {
    if (!ssd.bait.id_ssd) return null;

    return (
        <Card type='inner' title='Нажива'>
            <div className='control'>
                <div className='field__title'>{ssd?.bait?.name}</div>
                <div className='field__value'>{ssd?.bait?.total}</div>
            </div>
        </Card>
    );
}
