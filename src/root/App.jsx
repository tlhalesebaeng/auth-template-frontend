import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './RoutesConfig.jsx';
import './App.css';

const router = createBrowserRouter(routesConfig);

export default function App() {
    return <RouterProvider router={router} />;
}
