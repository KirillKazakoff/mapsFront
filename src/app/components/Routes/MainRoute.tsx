import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '../../stores/authStore';

const MainRoute = observer(() => {
    const navigate = useNavigate();
    const { isLogin } = authStore;

    useEffect(() => {
        // if (!isLogin) {
        // navigate('/login');
        // return;
        // }
        navigate('/map');
    }, [isLogin]);

    return (
        <div className='some-class'>
            <Outlet />
        </div>
    );
});

export default MainRoute;
