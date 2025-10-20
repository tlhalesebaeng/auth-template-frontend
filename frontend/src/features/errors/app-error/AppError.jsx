import './AppError.css';
import { useRouteError } from 'react-router-dom';

export default function AppError() {
    const error = useRouteError();

    return (
        <main>
            <h1>An Error Has Occurred</h1>
            <div className="app-error-details">
                <p>{error.error.message}</p>
                <p>{error.status}</p>
            </div>
        </main>
    );
}
