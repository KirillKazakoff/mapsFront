import React from 'react';
import { observer } from 'mobx-react-lite';
import { LoginForm } from './LoginForm';

export const LoginRoute = observer(() => {
    return <LoginForm />;
});
