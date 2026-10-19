/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable lines-between-class-members */
import { makeAutoObservable } from 'mobx';

class ButtonsStore {
    isBurgerOpened = false;
    isSSDHiden = false;

    constructor() {
        makeAutoObservable(this);
    }

    setBurger(status: boolean) {
        this.isBurgerOpened = status;
    }

    setIsSSDHiden(status: boolean) {
        this.isSSDHiden = status;
    }
}

export const buttonsStore = new ButtonsStore();
