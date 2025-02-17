import AlternativeAuth from '../../components/auth-components/AlternativeAuth';
import Auth from '../../components/auth-components/Auth';
import AuthQuestion from '../../components/auth-components/AuthQuestion';
import RememberMe from '../../components/auth-components/RememberMe';
import Button from '../../utils/Button';
import Input from '../../utils/Input';

export default function Login() {
    const description = 'Login in to access your account';
    return (
        <Auth title="Login" description={description}>
            <form>
                <div className="input-container column">
                    <Input type="email" placeholder="Email" />
                    <Input type="email" placeholder="Email" />
                </div>
                <RememberMe type="Login" checkboxText="Remember me" />
                <AuthQuestion
                    question="Don't have an account?"
                    option="Sign up"
                    name="question-container"
                >
                    <Button>Login</Button>
                </AuthQuestion>
            </form>
            <AlternativeAuth alt="Login" />
        </Auth>
    );
}
