import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/authPages/Login';
import Signup from './pages/authPages/Signup';
import ResetPassword from './pages/authPages/ResetPassword';
import ForgotPassword from './pages/authPages/ForgotPassword';
import CodeVerification from './pages/authPages/CodeVerification';
import Home from './components/app-components/Home';
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
