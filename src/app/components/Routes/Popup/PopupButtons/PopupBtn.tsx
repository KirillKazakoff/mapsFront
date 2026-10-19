import React from 'react';
import { Button } from 'antd';

interface PopupBtnProps {
    onClick: () => void;
    icon: React.ReactNode;
    top: number;
    isActive: boolean; // Проп для подсветки активного состояния
}

export const PopupBtn: React.FC<PopupBtnProps> = ({
    onClick,
    icon,
    top,
    isActive = false,
}) => {
    console.log(`in component: ${isActive}`);

    return (
        <Button
            type={isActive ? 'primary' : 'default'}
            icon={icon}
            onClick={onClick}
            style={{
                position: 'absolute',
                top: `${top}px`,
                right: '20px',
                zIndex: 1000 /* Гарантированно выше слоев карты */,
                width: '45px',
                height: '45px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // Динамически меняем стили в зависимости от активности
                backgroundColor: isActive ? undefined : '#ffffff',
                color: isActive ? '#ffffff' : '#000000',
                border: isActive ? 'none' : '1px solid #d9d9d9',
            }}
        />
    );
};
