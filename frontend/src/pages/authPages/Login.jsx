import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlternativeAuth from '../../components/auth-components/AlternativeAuth';
import Auth from '../../components/auth-components/Auth';
import AuthQuestion from '../../components/auth-components/AuthQuestion';
import RememberMe from '../../components/auth-components/RememberMe';
import Button from '../../utils/Button';
import Input from '../../utils/Input';
import { isValidEmail } from '../../validators';

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({}); //This will cause the whole component to reload and cause some performance implications

    //will use this function in many places, so create your own hook to handle this
    function handleChange(event, type) {
        setData((prevState) => {
            return {
                ...prevState,
                [type]: event.target.value,
            };
        });
    }

    // Function to login the user
    async function handleLogin(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        try {
            const response = await axios.post(
                'http://127.0.0.1:3000/quiz/app/api/v1/users/login',
                data
            );
            console.log(response.data);
        } catch (err) {
            console.log(err.response.data);
        }
    }

    let disabledButton = false;
    if (!data.email || !data.password || !isValidEmail(data.email)) {
        disabledButton = true;
    }

    const description = 'Login in to access your account';

    return (
        <Auth title="Login" description={description}>
            <form onSubmit={handleLogin}>
                <div className="input-container column">
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'email');
                        }}
                        type="email"
                        placeholder="Email"
                        name="email"
                    />
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'password');
                        }}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <RememberMe type="Login" checkboxText="Remember me" />
                <AuthQuestion
                    question="Don't have an account?"
                    option="Sign up"
                    name="question-container"
                >
                    <Button disabledButton={disabledButton}>Login</Button>
                </AuthQuestion>
            </form>
            <AlternativeAuth action="Login" alt="Login" />
        </Auth>
    );
}
