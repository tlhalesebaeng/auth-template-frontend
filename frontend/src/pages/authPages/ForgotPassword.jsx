import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../components/auth-components/Auth';
import AlternativeAuth from '../../components/auth-components/AlternativeAuth';
import Input from '../../utils/Input';
import Button from '../../utils/Button';
import { isValidEmail } from '../../validators';
import axios from 'axios';
import Error from '../../components/Error';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    async function handleSubmitEmail(event) {
        event.preventDefault();

        try {
            const data = { email };
            const response = await axios.post(
                'http://127.0.0.1:3000/quiz/app/api/v1/users/pasword/reset',
                data
            );
            console.log(response.data);
            navigate('/users/password/reset/verify/code');
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
                {error && <Error errorMessage={error} />}
                <Button
                    disabledButton={disabledButton}
                    onClick={handleSubmitEmail}
                >
                    Submit
                </Button>
            </form>
            <AlternativeAuth alt="Login" />
        </Auth>
    );
}
