import Main from 'pages/Main';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

export const Routes = () => {
    return (
        <ReactRouterRoutes>
            <Route path="/" element={<Main />} />
        </ReactRouterRoutes>
    );
};
