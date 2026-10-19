import React from 'react';
import { Form, Select, DatePicker } from 'antd';
import { CalendarOutlined, DatabaseFilled } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { VesselT } from '../../../../types/backend';
import { FormFieldsT } from './usePopup';

const { RangePicker } = DatePicker;

type VesselsFilterFormProps = {
    form: FormInstance<FormFieldsT>;
    vesselsList: VesselT[];
};

export const PopupForm: React.FC<VesselsFilterFormProps> = ({ form, vesselsList }) => {
    return (
        <Form form={form} layout='vertical'>
            <Form.Item
                name='vesselIds'
                label='Список судов'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, выберите хотя бы одно судно!',
                    },
                ]}
            >
                <Select
                    mode='multiple'
                    allowClear
                    placeholder='Выберите суда из списка'
                    suffixIcon={<DatabaseFilled />}
                    style={{ width: '100%' }}
                    filterOption={(input, option) => (option?.label?.toString() ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())}
                    options={vesselsList.map((v) => ({
                        value: v.idVessel,
                        label: v.nameRus,
                    }))}
                />
            </Form.Item>
            <Form.Item
                name='dateRange'
                label='Период выгрузки данных'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, укажите период дат для выгрузки!',
                    },
                ]}
            >
                <RangePicker
                    format='YYYY-MM-DD'
                    placeholder={['Дата начала', 'Дата окончания']}
                    style={{ width: '100%' }}
                    suffixIcon={<CalendarOutlined />}
                />
            </Form.Item>
        </Form>
    );
};
