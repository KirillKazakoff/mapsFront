/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { Form, ThemeConfig } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { HistoryPayloadT, VesselT } from '../../../../types/backend';
import { api } from '../../../api/api';
import { ssdStore } from '../../../stores/ssdStore';

// Типы для внутренней структуры формы Ant Design
export type FormFieldsT = {
    vesselIds: Array<string>;
    dateRange: [Dayjs, Dayjs];
};

type UseCustomModalFormProps = {
    isVisible: boolean;
    onClose: () => void;
};

export const useModalForm = ({ isVisible, onClose }: UseCustomModalFormProps) => {
    const [form] = Form.useForm<FormFieldsT>();
    const [vesselsList, setVessels] = useState<VesselT[] | null>(null);

    // Загрузка списка судов при монтировании
    useEffect(() => {
        const loadVessels = async () => {
            try {
                const res = await api.get.vessels();
                setVessels(res);
            } catch (err) {
                console.error('Ошибка загрузки судов:', err);
            }
        };
        loadVessels();
    }, []);

    // Установка дефолтных значений при открытии модального окна
    useEffect(() => {
        if (isVisible && vesselsList && vesselsList.length > 0) {
            const defaultRange: [Dayjs, Dayjs] = [dayjs().subtract(20, 'day'), dayjs()];
            form.setFieldsValue({
                // Омолон судно по умолчанию
                vesselIds: ['28479-3301'],
                dateRange: defaultRange,
            });
        }
    }, [isVisible, vesselsList, form]);

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();

            const formattedValues: HistoryPayloadT = {
                vesselIds: values.vesselIds,
                dateStart: values.dateRange[0].format('YYYY-MM-DD'),
                dateEnd: values.dateRange[1].format('YYYY-MM-DD'),
            };

            const res = await api.get.ssdHistory(formattedValues);
            ssdStore.setHistory(res);

            form.resetFields();
            onClose();
        } catch (error) {
            console.log('Ошибка валидации формы:', error);
        }
    };

    const themeConfig: ThemeConfig = {
        components: {
            Modal: {
                headerBg: '#f0f2f5',
                contentBg: '#ffffff',
                titleFontSize: 18,
                borderRadiusLG: 16,
            },
        },
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return {
        form,
        vesselsList,
        onSubmit,
        handleCancel,
        themeConfig,
        // Возвращаем флаг готовности, чтобы компонент знал, нужно ли рендериться
        isReady: isVisible && vesselsList !== null,
    };
};
