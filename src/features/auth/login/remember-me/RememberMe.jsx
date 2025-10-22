import './RememberMe.css';

export default function RememberMe({ onForgotPassword }) {
    return (
        <div className="remeber-me-container row">
            {/*<div>
                 Will implement and make this feature available later
                    <input type="checkbox" />
                    <p>{checkboxText}</p> 
                
            </div>*/}
            <a onClick={onForgotPassword}>Forgot Password</a>
        </div>
    );
}
