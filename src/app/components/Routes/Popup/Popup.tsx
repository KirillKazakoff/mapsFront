/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
import {
    Modal, Button, Space, ConfigProvider, theme,
} from 'antd';
import { DatabaseFilled } from '@ant-design/icons';
import { useModalForm } from './usePopup';
import { PopupForm } from './PopupForm';

type PopupProps = {
    isVisible: boolean;
    onClose: () => void;
};

export const Popup: React.FC<PopupProps> = ({ isVisible, onClose }) => {
    const { token } = theme.useToken();

    // Подключаем кастомный хук
    const {
        form, vesselsList, onSubmit, handleCancel, isReady, themeConfig,
    } = useModalForm({
        isVisible,
        onClose,
    });

    // Если данные еще не загружены форма скрыта
    if (!isReady) return null;

    // prettier-ignore
    return (
        <ConfigProvider
            theme={themeConfig}
        >
            <Modal
                open={isVisible}
                onCancel={handleCancel}
                title={(
                    <Space>
                        <DatabaseFilled style={{ color: token.colorPrimary }} />
                        <span>Отображение позиций ССД по судам за период:</span>
                    </Space>
                )}
                footer={[
                    <Button key='back' onClick={handleCancel} style={{ borderRadius: '6px' }}>
                        Отмена
                    </Button>,
                    <Button key='submit' type='primary' onClick={onSubmit} style={{ borderRadius: '6px' }}>
                        Сохранить изменения
                    </Button>,
                ]}
                styles={{
                    mask: { backdropFilter: 'blur(4px)' },
                    body: { paddingTop: '20px', paddingBottom: '10px' },
                }}
                width={600}
                centered
            >
                <PopupForm form={form} vesselsList={vesselsList} />
            </Modal>
        </ConfigProvider>
    );
};
