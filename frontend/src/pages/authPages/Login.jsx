import Auth from '../../components/auth-components/Auth';
import Button from '../../utils/Button';
import Input from '../../utils/Input';

export default function Login() {
    return (
        <Auth title="Login">
            <div className="input-container column">
                <Input type="email" placeholder="Email" />
                <Input type="email" placeholder="Email" />
            </div>
            <div className="remeber-me-container row">
                <div>
                    <input type="checkbox" />
                    <p>Remember me</p>
                </div>
                <a href="#">Forgot Password</a>
            </div>
            <div className="question-container column">
                <Button title="Login" />
                <p className="question">
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </div>
        </Auth>
    );
}
