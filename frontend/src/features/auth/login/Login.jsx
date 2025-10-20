import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal';
import { jwtDecode } from 'jwt-decode';
import Auth from '../../../components/auth-components/auth-wrapper/Auth.jsx';
import AuthQuestion from '../../../components/auth-components/auth-question/AuthQuestion.jsx';
import RememberMe from './remember-me/RememberMe.jsx';
import Button from '../../../components/main/button/Button.jsx';
import Input from '../../../components/main/input/Input.jsx';
import { isValidEmail } from '../../../utils/validators.js';
import Error from '../../errors/error-message/Error.jsx';
import { useFetch } from '../../../hooks/useFetch.js';

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({}); //This will cause the whole component to reload and cause some performance implications
    const { isLoading, error, res, setError } = useFetch();

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
    async function handleLogin(event) {
        event.preventDefault();

        const response = await res(
            '/quiz/app/api/v1/users/login',
            'post',
            data
        );

        if (response) {
            // Get the token
            const token = response.data.token;

            // Decode the token
            const decoded = jwtDecode(token);

            // Set the token as a cookie
            const cookies = Cookie();
            cookies.set('jwt', token, {
                expires: new Date(decoded.exp * 1000),
            });

            // Navigate to the home page
            navigate('/home');
        }
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
                        htmlFor="email"
                        inputId="email"
                    />
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'password');
                        }}
                        type="password"
                        placeholder="Password"
                        htmlFor="password"
                        inputId="password"
                    />
                </div>
                <RememberMe
                    onForgotPassword={() => navigate('/users/password/reset')}
                />
                <AuthQuestion
                    question="Don't have an account?"
                    linkText="Sign up"
                    name="question-container"
                    onClick={() => navigate('/users/signup')}
                >
                    {error && !isLoading && <Error errorMessage={error} />}
                    <Button
                        onClick={handleLogin}
                        disabledButton={isLoading ? true : disabledButton}
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                </AuthQuestion>
            </form>
        </Auth>
    );
}
