import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/authPages/Login';
import Signup from './pages/authPages/Signup';
import ResetPassword from './pages/authPages/ResetPassword';
import ForgotPassword from './pages/authPages/ForgotPassword';
import CodeVerification from './pages/authPages/CodeVerification';
import './App.css';
import Home from './components/app-components/Home';

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
    {
        path: '/home',
        element: <Home />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
