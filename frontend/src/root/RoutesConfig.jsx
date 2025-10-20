import Login from '../features/auth/login/Login.jsx';
import Signup from '../features/auth/signup/Signup.jsx';
import ResetPassword from '../features/auth/reset-password/ResetPassword.jsx';
import ForgotPassword from '../features/auth/forgot-password/ForgotPassword.jsx';
import CodeVerification from '../features/auth/code-verification/CodeVerification.jsx';
import Home from '../features/Home.jsx';
import AppError from '../features/errors/app-error/AppError.jsx';

const routesConfig = [
    {
        path: '/',
        errorElement: <AppError />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: 'users',
                children: [
                    {
                        path: 'signup',
                        element: <Signup />,
                    },
                    {
                        path: 'password/reset',
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
