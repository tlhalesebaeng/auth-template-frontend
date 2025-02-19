import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlternativeAuth from '../../components/auth-components/AlternativeAuth';
import Auth from '../../components/auth-components/Auth';
import AuthQuestion from '../../components/auth-components/AuthQuestion';
import RememberMe from '../../components/auth-components/RememberMe';
import Button from '../../utils/Button';
import Input from '../../utils/Input';
import { isValidEmail } from '../../validators';

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({}); //This will cause the whole component to reload and cause some performance implications

    //will use this function in many places, so create your own hook to handle this
    function handleChange(event, type) {
        setData((prevState) => {
            return {
                ...prevState,
                [type]: event.target.value,
            };
        });
    }

    // Function to login the user
    function handleLogin(event) {
        event.preventDefault();
        navigate('/home');
    }

    let disabledButton = false;
    if (!data.email || !data.password || !isValidEmail(data.email)) {
        disabledButton = true;
    }

    const description = 'Login in to access your account';

    return (
        <Auth title="Login" description={description}>
            <form>
                <div className="input-container column">
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'email');
                        }}
                        type="email"
                        placeholder="Email"
                    />
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'password');
                        }}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <RememberMe type="Login" checkboxText="Remember me" />
                <AuthQuestion
                    question="Don't have an account?"
                    option="Sign up"
                    name="question-container"
                >
                    <Button
                        disabledButton={disabledButton}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </AuthQuestion>
            </form>
            <AlternativeAuth action="Login" alt="Login" />
        </Auth>
    );
}
