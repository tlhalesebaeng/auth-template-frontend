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

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await axios.patch(
                'http://127.0.0.1:3000/quiz/app/api/v1/users/password/642267/new',
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
    if (!data.newPassword || !data.confirmNewPassword) {
        disabledButton = true;
    }

    const description = 'Please set a new password for your account';

    return (
        <Auth title="Set a new password" description={description}>
            <form onSubmit={handleSetPassword}>
                <div className="input-container column">
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'newPassword');
                        }}
                        type="password"
                        placeholder="New Password"
                        name="password"
                    />
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'confirmNewPassword');
                        }}
                        type="password"
                        placeholder="Confirm New Password"
                        name="passwordConfirm"
                    />
                </div>
                <Button disabledButton={disabledButton}>Set password</Button>
            </form>
        </Auth>
    );
}
