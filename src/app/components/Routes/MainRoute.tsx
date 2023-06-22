import React from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const MainRoute = observer(() => {
    return (
        <div className='some-class'>
            <Outlet />
        </div>
    );
});

export default MainRoute;
