import { useNavigate } from 'react-router-dom';
import AlternativeAuth from '../../components/auth-components/AlternativeAuth';
import Auth from '../../components/auth-components/Auth';
import AuthQuestion from '../../components/auth-components/AuthQuestion';
import RememberMe from '../../components/auth-components/RememberMe';
import Button from '../../utils/Button';
import Input from '../../utils/Input';

export default function Login() {
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();
        navigate('/home');
    }

    const description = 'Login in to access your account';

    return (
        <Auth title="Login" description={description}>
            <form>
                <div className="input-container column">
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                </div>
                <RememberMe type="Login" checkboxText="Remember me" />
                <AuthQuestion
                    question="Don't have an account?"
                    option="Sign up"
                    name="question-container"
                >
                    <Button onClick={handleLogin}>Login</Button>
                </AuthQuestion>
            </form>
            <AlternativeAuth action="Login" alt="Login" />
        </Auth>
    );
}
