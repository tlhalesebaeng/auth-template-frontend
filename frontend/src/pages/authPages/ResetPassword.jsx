import { useNavigate } from 'react-router-dom';
import Auth from '../../components/auth-components/Auth';
import Button from '../../utils/Button';
import Input from '../../utils/Input';

export default function ResetPassword() {
    const navigate = useNavigate();

    function handleSetPassword(event) {
        event.preventDefault();
        navigate('/home');
    }

    const description = 'Please set a new password for your account';

    return (
        <Auth title="Set a new password" description={description}>
            <form>
                <div className="input-container column">
                    <Input type="password" placeholder="New Password" />
                    <Input type="password" placeholder="Confirm New Password" />
                </div>
                <Button onClick={handleSetPassword}>Set password</Button>
            </form>
        </Auth>
    );
}
