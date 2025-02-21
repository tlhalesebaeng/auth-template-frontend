import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Auth from '../../components/auth-components/Auth';
import AuthQuestion from '../../components/auth-components/AuthQuestion';
import Input from '../../utils/Input';
import Button from '../../utils/Button';
import Error from '../../components/Error';

export default function CodeVerification() {
    const navigate = useNavigate();
    const [code, setCode] = useState();
    const [error, setError] = useState('');

    async function handleSubmitCode(event) {
        event.preventDefault();
        //642267

        try {
            const response = await axios.get(
                `http://127.0.0.1:3000/quiz/app/api/v1/users/password/${code}`
            );
            console.log(response.data);
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
                    question="Didn't receive the code?"
                    option="Resend"
                    name="other-question-container"
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
