import { useState } from 'react';
import Auth from '../../../components/auth-components/auth-wrapper/Auth.jsx';
import AuthQuestion from '../../../components/auth-components/auth-question/AuthQuestion.jsx';
import Button from '../../../components/main/button/Button.jsx';
import Input from '../../../components/main/input/Input.jsx';
import { isValidEmail } from '../../../utils/validators.js';
import { useNavigate } from 'react-router-dom';
import Error from '../../errors/Error.jsx';
import { useFetch } from '../../../hooks/useFetch.js';

export default function Signup() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { isLoading, error, res } = useFetch();

    async function handleCreateAccount(event) {
        event.preventDefault();

        // Make the request
        const response = await res(
            '/quiz/app/api/v1/users/signup',
            'post',
            data
        );

        if (response) {
            // Navigate to the home page
            navigate('/home');
        }
    }

    function handleChange(event, type) {
        setData((prevState) => {
            return {
                ...prevState,
                [type]: event.target.value,
            };
        });
    }

    let disabledButton = false;
    if (
        !data.firstName ||
        !data.lastName ||
        !data.email ||
        !data.username ||
        !data.password ||
        !data.passwordConfirm ||
        !isValidEmail(data.email)
    ) {
        disabledButton = true;
    }

    const description = 'Set up a new account for your profile';

    return (
        <Auth title="Sign up" description={description}>
            <form>
                <div className="input-container column">
                    <div className="row">
                        <Input
                            onChange={(event) => {
                                handleChange(event, 'firstName');
                            }}
                            rightMargin="right-margin"
                            type="text"
                            placeholder="First Name"
                        />
                        <Input
                            onChange={(event) => {
                                handleChange(event, 'lastName');
                            }}
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="row">
                        <Input
                            onChange={(event) => {
                                handleChange(event, 'email');
                            }}
                            rightMargin="right-margin"
                            type="text"
                            placeholder="Email"
                        />
                        <Input
                            onChange={(event) => {
                                handleChange(event, 'username');
                            }}
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'password');
                        }}
                        type="password"
                        placeholder="Password"
                    />
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'passwordConfirm');
                        }}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </div>
                <AuthQuestion
                    question="Already have an account?"
                    option="Login"
                    name="question-container"
                >
                    <Button
                        onClick={handleCreateAccount}
                        disabledButton={isLoading ? true : disabledButton}
                    >
                        {error && !isLoading && <Error errorMessage={error} />}

                        {isLoading ? 'Loading...' : 'Create account'}
                    </Button>
                </AuthQuestion>
            </form>
        </Auth>
    );
}
