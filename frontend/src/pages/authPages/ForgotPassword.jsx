import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../components/auth-components/Auth';
import AlternativeAuth from '../../components/auth-components/AlternativeAuth';
import Input from '../../utils/Input';
import Button from '../../utils/Button';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();

    function handleSubmitEmail(event) {
        event.preventDefault();
        navigate('/users/password/reset/code');
    }

    let disabledButton = false;
    if (!email) {
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
            </form>
            <AlternativeAuth alt="Login" />
        </Auth>
    );
}
