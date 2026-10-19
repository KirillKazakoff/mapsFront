import React from 'react';
import { ClearOutlined, EyeOutlined, MenuOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { buttonsStore } from '../../../../stores/buttonsStore';
import { ssdStore } from '../../../../stores/ssdStore';
import { PopupBtn } from './PopupBtn';

export const PopupButtons = observer(() => {
    const { isBurgerOpened, isSSDHiden } = buttonsStore;

    const onBurgerClick = () => {
        buttonsStore.setBurger(!isBurgerOpened);
    };

    const onClearClick = () => {
        ssdStore.clearHistory();
    };

    const onToggleSSDClick = () => {
        buttonsStore.setIsSSDHiden(!isSSDHiden);
    };

    return (
        <>
            <PopupBtn
                top={20}
                onClick={onBurgerClick}
                isActive={isBurgerOpened}
                icon={<MenuOutlined style={{ fontSize: '18px' }} />}
            />
            <PopupBtn
                top={80}
                onClick={onClearClick}
                isActive={false}
                icon={<ClearOutlined style={{ fontSize: '20px' }} />}
            />
            <PopupBtn
                top={140}
                onClick={onToggleSSDClick}
                isActive={isSSDHiden}
                icon={<EyeOutlined style={{ fontSize: '22px' }} />}
            />
        </>
    );
});
