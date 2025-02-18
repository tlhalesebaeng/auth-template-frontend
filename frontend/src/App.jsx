import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/authPages/Login';
import Signup from './pages/authPages/Signup';
import ResetPassword from './pages/authPages/ResetPassword';
import ForgotPassword from './pages/authPages/ForgotPassword';
import CodeVerification from './pages/authPages/CodeVerification';
import './App.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/users/password/reset',
        element: <ForgotPassword />,
    },
    {
        path: '/users/password/reset/code',
        element: <CodeVerification />,
    },
    {
        path: '/users/password/reset/entry',
        element: <ResetPassword />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
