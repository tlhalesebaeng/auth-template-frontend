import Login from '../features/auth/login/Login.jsx';
import Signup from '../features/auth/signup/Signup.jsx';
import ResetPassword from '../features/auth/reset-password/ResetPassword.jsx';
import ForgotPassword from '../features/auth/forgot-password/ForgotPassword.jsx';
import CodeVerification from '../features/auth/code-verification/CodeVerification.jsx';
import Home from '../features/Home.jsx';
import RouteError from '../features/errors/routes/main/RouteError.jsx';
import { Outlet, redirect } from 'react-router-dom';

const routesConfig = [
    {
        path: '/',
        errorElement: <RouteError />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: 'users/signup',
                element: <Signup />,
            },
            {
                path: 'users/password/reset',
                children: [
                    {
                        index: true,
                        element: <ForgotPassword />,
                    },
                    {
                        path: 'verify/code',
                        element: <CodeVerification />,
                    },
                    {
                        path: ':code/new',
                        element: <ResetPassword />,
                    },
                ],
            },
            {
                path: 'home',
                element: <Home />,
            },
        ],
    },
];

export default routesConfig;
