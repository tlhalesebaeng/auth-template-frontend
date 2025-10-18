import { NavLink } from 'react-router-dom';
import './RememberMe.css';

export default function RememberMe() {
    return (
        <div className="remeber-me-container row">
            {/*<div>
                 Will implement and make this feature available later
                    <input type="checkbox" />
                    <p>{checkboxText}</p> 
                
            </div>*/}
            <NavLink to="/users/password/reset">Forgot Password</NavLink>
        </div>
    );
}
