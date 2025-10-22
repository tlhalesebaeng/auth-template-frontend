import './RouteError.css';
import { useRouteError } from 'react-router-dom';

export default function RouteError() {
    const error = useRouteError();

    return (
        <main>
            <h1>An Error Has Occurred</h1>
            <div className="route-error-details">
                <p>{error.error.message}</p>
                <p>{error.status}</p>
            </div>
        </main>
    );
}
