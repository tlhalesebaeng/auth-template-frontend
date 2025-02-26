import { useState } from 'react';
import AlternativeAuth from '../../components/auth-components/AlternativeAuth';
import Auth from '../../components/auth-components/Auth';
import AuthQuestion from '../../components/auth-components/AuthQuestion';
import Button from '../../utils/Button';
import Input from '../../utils/Input';
import { isValidEmail } from '../../validators';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/Error';
import { useFetch } from '../../hooks/useFetch';

export default function Signup() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { error, res } = useFetch();

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
                        disabledButton={disabledButton}
                    >
                        {error && <Error errorMessage={error} />}
                        Create account
                    </Button>
                </AuthQuestion>
            </form>
            <AlternativeAuth action="Signup" alt="Signup" />
        </Auth>
    );
}
