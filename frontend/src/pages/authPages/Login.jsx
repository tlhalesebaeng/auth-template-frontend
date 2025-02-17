import Auth from '../../components/auth-components/Auth';

export default function Login() {
    return (
        <Auth title="Login">
            <div className="input-container column">
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
            </div>
            <div className="remeber-me-container row">
                <div>
                    <input type="checkbox" />
                    <p>Remember me</p>
                </div>
                <a href="#">Forgot Password</a>
            </div>
            <div className="question-container column">
                <button className="btn">Login</button>
                <p className="question">
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </div>
        </Auth>
    );
}
