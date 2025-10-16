import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/auth-pages/Login';
import Signup from './pages/auth-pages/Signup';
import ResetPassword from './pages/auth-pages/ResetPassword';
import ForgotPassword from './pages/auth-pages/ForgotPassword';
import CodeVerification from './pages/auth-pages/CodeVerification';
import Home from './features/Home.jsx';
import './App.css';

const router = createBrowserRouter([
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
]);

export default function App() {
    return <RouterProvider router={router} />;
}
