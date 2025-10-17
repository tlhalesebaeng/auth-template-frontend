import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Auth from '../../../components/auth-components/Auth.jsx';
import AuthQuestion from '../../../components/auth-components/AuthQuestion.jsx';
import Input from '../../../components/main/input/Input.jsx';
import Button from '../../../components/main/button/Button.jsx';
import Error from '../../errors/Error.jsx';
import { useFetch } from '../../../hooks/useFetch.js';

const resendInterval = 20;

export default function CodeVerification() {
    const navigate = useNavigate();
    const location = useLocation();
    const [code, setCode] = useState();
    const [codeResent, setCodeResent] = useState(false);
    const [resendTime, setResendTime] = useState(resendInterval); //This will cause a lot of rendering of this component, so fix it
    const { isLoading, error, res } = useFetch();

    async function handleSubmitCode(event) {
        event.preventDefault();

        // Make the request
        const response = await res(
            `/quiz/app/api/v1/users/password/${code}`,
            'get'
        );

        if (response) {
            // Navigate to the reset password page
            navigate(`/users/password/reset/${code}/new`);
        }
    }

    async function handleResendCode(event) {
        event.preventDefault();

        // Make the request
        const response = await res('/quiz/app/api/v1/users/pasword/reset', {
            email: location.state.email,
        });

        if (response.status === 200) {
            // Show the timer
            setCodeResent(true);
            const time = setInterval(() => {
                setResendTime((prevTime) => {
                    const newTime = prevTime - 1;
                    return newTime;
                });
            }, 1000);
            setTimeout(() => {
                // Hide the timer
                setCodeResent(false);
                setResendTime(resendInterval);
                clearInterval(time);
            }, resendInterval * 1000);
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
                    disabledButton={isLoading ? true : disabledButton}
                    onClick={handleSubmitCode}
                >
                    {isLoading ? 'Loading...' : 'Submit'}
                </Button>
                {error && !isLoading && (
                    <Error biggerMargin={true} errorMessage={error} />
                )}
            </form>
        </Auth>
    );
}
