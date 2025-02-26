import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Auth from '../../components/auth-components/Auth';
import Button from '../../utils/Button';
import Input from '../../utils/Input';
import Error from '../../components/Error';
import { useFetch } from '../../hooks/useFetch';

export default function ResetPassword() {
    const { code } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { error, res } = useFetch();

    async function handleSetPassword(event) {
        event.preventDefault();

        // Make the request
        const response = await res(
            `/quiz/app/api/v1/users/password/${code}/new`,
            'patch',
            data
        );

        if (response) {
            // Navigate to the home page
            navigate('/home');
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
                {error && <Error biggerMargin={true} errorMessage={error} />}
            </form>
        </Auth>
    );
}
