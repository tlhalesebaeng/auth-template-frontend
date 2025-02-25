import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Auth from '../../components/auth-components/Auth';
import AuthQuestion from '../../components/auth-components/AuthQuestion';
import Input from '../../utils/Input';
import Button from '../../utils/Button';
import Error from '../../components/Error';
import api from '../../fetchFn';

const resendInterval = 20;

export default function CodeVerification() {
    const navigate = useNavigate();
    const location = useLocation();
    const [code, setCode] = useState();
    const [error, setError] = useState('');
    const [codeResent, setCodeResent] = useState(false);
    const [resendTime, setResendTime] = useState(resendInterval); //This will cause a lot of rendering of this component, so fix it

    async function handleSubmitCode(event) {
        event.preventDefault();

        try {
            const response = await api.get(
                `/quiz/app/api/v1/users/password/${code}`
            );
            navigate(`/users/password/reset/${code}/new`);
        } catch (err) {
            const responseData = err.response.data;
            if (responseData) {
                setError(responseData.message);
            } else {
                setError('Could not process login request');
            }
        }
    }

    async function handleResendCode(event) {
        event.preventDefault();

        try {
            const data = { email: location.state.email };
            const response = await api.post(
                '/quiz/app/api/v1/users/pasword/reset',
                data
            );
            setCodeResent(true);
            const time = setInterval(() => {
                setResendTime((prevTime) => {
                    const newTime = prevTime - 1;
                    return newTime;
                });
            }, 1000);
            setTimeout(() => {
                setCodeResent(false);
                setResendTime(resendInterval);
                clearInterval(time);
            }, resendInterval * 1000);
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
    if (!code) {
        disabledButton = true;
    }

    const description = 'Enter the one time code sent to your email.';

    return (
        <Auth
            title="Verify Code"
            description={description}
            backTitle="Back to login"
        >
            <form>
                <div className="input-container column">
                    <Input
                        onChange={(event) => {
                            setCode(event.target.value);
                        }}
                        type="text"
                        placeholder="Enter Code"
                    />
                </div>
                <AuthQuestion
                    question={
                        codeResent
                            ? `You can resend after: ${resendTime} seconds`
                            : "Didn't receive the code?"
                    }
                    option={codeResent ? '' : 'Resend'}
                    name="other-question-container"
                    onClickOption={handleResendCode}
                ></AuthQuestion>
                <Button
                    disabledButton={disabledButton}
                    onClick={handleSubmitCode}
                >
                    Submit
                </Button>
                {error && <Error biggerMargin={true} errorMessage={error} />}
            </form>
        </Auth>
    );
}
