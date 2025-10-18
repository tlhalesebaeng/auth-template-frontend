import Login from '../features/auth/login/Login.jsx';
import Signup from '../features/auth/signup/Signup.jsx';
import ResetPassword from '../features/auth/reset-password/ResetPassword.jsx';
import ForgotPassword from '../features/auth/forgot-password/ForgotPassword.jsx';
import CodeVerification from '../features/auth/code-verification/CodeVerification.jsx';
import Home from '../features/Home.jsx';

const routesConfig = [
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/users/signup',
        element: <Signup />,
    },
    {
        path: '/users/password/reset',
        element: <ForgotPassword />,
    },
    {
        path: '/users/password/reset/verify/code',
        element: <CodeVerification />,
    },
    {
        path: '/users/password/reset/:code/new',
        element: <ResetPassword />,
    },
    {
        path: '/home',
        element: <Home />,
    },
];

export default routesConfig;
