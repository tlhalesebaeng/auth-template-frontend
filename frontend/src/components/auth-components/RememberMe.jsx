import './RememberMe.css';

export default function RememberMe({ type, checkboxText }) {
    return (
        <div className="remeber-me-container row">
            <div>
                <input type="checkbox" />
                <p>{checkboxText}</p>
            </div>
            {type && <a href="#">Forgot Password</a>}
        </div>
    );
}
