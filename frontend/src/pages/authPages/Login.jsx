import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import Cookie from 'cookie-universal';
import { jwtDecode } from 'jwt-decode';
import AlternativeAuth from '../../components/auth-components/AlternativeAuth';
import Auth from '../../components/auth-components/Auth';
import AuthQuestion from '../../components/auth-components/AuthQuestion';
import RememberMe from '../../components/auth-components/RememberMe';
import Button from '../../utils/Button';
import Input from '../../utils/Input';
import { isValidEmail } from '../../validators';
import Error from '../../components/Error';
import { useFetch } from '../../hooks/useFetch';

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({}); //This will cause the whole component to reload and cause some performance implications
    const { isLoading, error, res, setError } = useFetch();

    const login = useGoogleLogin({
        onSuccess: (response) => {
            // Get the token
            const token = response.access_token;

            // Get the expire time
            const expiryTime = Date.now() + 90 * 24 * 60 * 60;

            // Store the token as a cookie
            const cookies = Cookie();
            cookies.set('jwt', token, {
                expires: new Date(expiryTime * 1000),
            });

            // Navigate to the home page
            navigate('/home');
        },
        onError: (err) => setError('Google login failed.'),
    });

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

    // Object consisting of all the third party authentication handler methods
    const thirdPartyAuth = {
        handleGoogleAuth: () => login(),
    };

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
                    {error && !isLoading && <Error errorMessage={error} />}
                    <Button
                        onClick={handleLogin}
                        disabledButton={isLoading ? true : disabledButton}
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                </AuthQuestion>
            </form>
            <AlternativeAuth
                thirdPartyAuth={thirdPartyAuth}
                action="Login"
                alt="Login"
            />
        </Auth>
    );
}
