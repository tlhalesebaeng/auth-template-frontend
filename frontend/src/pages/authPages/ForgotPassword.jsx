import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../components/auth-components/Auth';
import AlternativeAuth from '../../components/auth-components/AlternativeAuth';
import Input from '../../utils/Input';
import Button from '../../utils/Button';
import { isValidEmail } from '../../validators';
import Error from '../../components/Error';
import api from '../../fetchFn';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    async function handleSubmitEmail(event) {
        event.preventDefault();

        try {
            const data = { email };
            const response = await api.post(
                '/quiz/app/api/v1/users/pasword/reset',
                data
            );

            if (import.meta.env.VITE_ENVIRONMENT === 'production') {
                setError(
                    'This app is under development. Please contact the administrator for the verification code.'
                );
                setTimeout(() => {
                    navigate('/users/password/reset/verify/code', {
                        state: { email },
                    });
                }, 10000);
            } else {
                navigate('/users/password/reset/verify/code', {
                    state: { email },
                });
            }
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
                    disabledButton={disabledButton}
                    onClick={handleSubmitEmail}
                >
                    Submit
                </Button>
                {error && <Error errorMessage={error} />}
            </form>
            <AlternativeAuth alt="Login" />
        </Auth>
    );
}
