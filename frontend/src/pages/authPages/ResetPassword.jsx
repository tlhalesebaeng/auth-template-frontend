import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../components/auth-components/Auth';
import Button from '../../utils/Button';
import Input from '../../utils/Input';
import axios from 'axios';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [data, setData] = useState({});

    async function handleSetPassword(event) {
        event.preventDefault();

        try {
            const response = await axios.patch(
                'http://127.0.0.1:3000/quiz/app/api/v1/users/password/479030/new',
                data
            );

            console.log(response.data);
            navigate('/home');
        } catch (err) {
            console.log(err.response.data);
        }
    }

    function handleChange(event, type) {
        setData((prevState) => {
            return { ...prevState, [type]: event.target.value };
        });
    }

    let disabledButton = false;
    if (!data.password || !data.passwordConfirm) {
        disabledButton = true;
    }

    const description = 'Please set a new password for your account';

    return (
        <Auth title="Set a new password" description={description}>
            <form>
                <div className="input-container column">
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'password');
                        }}
                        type="password"
                        placeholder="New Password"
                    />
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'passwordConfirm');
                        }}
                        type="password"
                        placeholder="Confirm New Password"
                    />
                </div>
                <Button
                    onClick={handleSetPassword}
                    disabledButton={disabledButton}
                >
                    Set password
                </Button>
            </form>
        </Auth>
    );
}
