import { makeAutoObservable } from 'mobx';

class AuthStore {
    isLogin = false;

    constructor() {
        makeAutoObservable(this);
    }

    login(payload: boolean) {
        this.isLogin = payload;
    }
}

const authStore = new AuthStore();

export default authStore;
