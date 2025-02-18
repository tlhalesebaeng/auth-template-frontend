import { useNavigate } from 'react-router-dom';
import Auth from '../../components/auth-components/Auth';
import Button from '../../utils/Button';
import Input from '../../utils/Input';
import { useState } from 'react';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [data, setData] = useState({});

    function handleSetPassword(event) {
        event.preventDefault();
        navigate('/home');
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
            <form>
                <div className="input-container column">
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'newPassword');
                        }}
                        type="password"
                        placeholder="New Password"
                    />
                    <Input
                        onChange={(event) => {
                            handleChange(event, 'confirmNewPassword');
                        }}
                        type="password"
                        placeholder="Confirm New Password"
                    />
                </div>
                <Button
                    disabledButton={disabledButton}
                    onClick={handleSetPassword}
                >
                    Set password
                </Button>
            </form>
        </Auth>
    );
}
