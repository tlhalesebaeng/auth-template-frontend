import { NavLink } from 'react-router-dom';
import './RememberMe.css';

export default function RememberMe({ type, checkboxText }) {
    return (
        <div className="remeber-me-container row">
            <div>
                <input type="checkbox" />
                <p>{checkboxText}</p>
            </div>
            {type && (
                <NavLink to="/users/password/reset">Forgot Password</NavLink>
            )}
        </div>
    );
}
