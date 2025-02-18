import { useState } from 'react';
import AlternativeAuth from '../../components/auth-components/AlternativeAuth';
import Auth from '../../components/auth-components/Auth';
import AuthQuestion from '../../components/auth-components/AuthQuestion';
import Button from '../../utils/Button';
import Input from '../../utils/Input';

export default function Signup() {
    const [data, setData] = useState({});

    function handleCreateAccount(event) {
        event.preventDefault();
        console.log('Create new account');
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
        !data.confirmPassword
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
                            handleChange(event, 'confirmPassword');
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
                        disabledButton={disabledButton}
                        onClick={handleCreateAccount}
                    >
                        Create account
                    </Button>
                </AuthQuestion>
            </form>
            <AlternativeAuth action="Signup" alt="Signup" />
        </Auth>
    );
}
