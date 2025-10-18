import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../components/auth-components/auth-wrapper/Auth.jsx';
import Input from '../../../components/main/input/Input.jsx';
import Button from '../../../components/main/button/Button.jsx';
import { isValidEmail } from '../../../utils/validators.js';
import Error from '../../errors/Error.jsx';
import { useFetch } from '../../../hooks/useFetch.js';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const { isLoading, error, res, setError } = useFetch();

    async function handleSubmitEmail(event) {
        event.preventDefault();

        // Make the request
        const response = await res(
            '/quiz/app/api/v1/users/pasword/reset',
            'post',
            { email }
        );

        if (response) {
            if (import.meta.env.VITE_ENVIRONMENT === 'development') {
                setError(
                    'This app is under development. Please contact the administrator for the verification code.'
                );
                setTimeout(() => {
                    // Navigate to the code verification page
                    navigate('/users/password/reset/verify/code', {
                        state: { email },
                    });
                }, 7000);
            } else {
                // Navigate to the code verification page
                navigate('/users/password/reset/verify/code', {
                    state: { email },
                });
            }
        }
    }

    let disabledButton = false;
    if (!email || !isValidEmail(email)) {
        disabledButton = true;
    }

    const description =
        "Don't worry, enter your email below to reset your password.";

    return (
        <Auth
            title="Forgot your password?"
            description={description}
            backTitle="Back to login"
        >
            <form>
                <div className="input-container column">
                    <Input
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        type="email"
                        placeholder="Email"
                    />
                </div>
                <Button
                    disabledButton={isLoading ? true : disabledButton}
                    onClick={handleSubmitEmail}
                >
                    {isLoading ? 'Loading...' : 'Submit'}
                </Button>
                {error && !isLoading && <Error errorMessage={error} />}
            </form>
        </Auth>
    );
}
