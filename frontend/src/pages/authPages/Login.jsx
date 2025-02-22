import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({}); //This will cause the whole component to reload and cause some performance implications
    const [error, setError] = useState('');

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

        try {
            // Make the request
            const response = await axios.post(
                'http://127.0.0.1:3000/quiz/app/api/v1/users/login',
                data
            );

            if (response.data) {
                // Get the token
                const token = response.data.token;

                // Decode the token
                const decoded = jwtDecode(token);

                // Set the token as a cookie
                const cookies = Cookie();
                cookies.set('jwt', token, {
                    expires: new Date(decoded.exp * 1000),
                });
            }

            // Navigate to the home page
            navigate('/home');
        } catch (err) {
            const responseData = err.response.data;
            if (responseData) {
                setError(responseData.message);
            } else {
                setError('Could not process login request');
            }
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
                    {error && <Error errorMessage={error} />}
                    <Button
                        onClick={handleLogin}
                        disabledButton={disabledButton}
                    >
                        Login
                    </Button>
                </AuthQuestion>
            </form>
            <AlternativeAuth action="Login" alt="Login" />
        </Auth>
    );
}
