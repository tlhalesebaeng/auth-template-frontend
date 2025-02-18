import Auth from '../../components/auth-components/Auth';
import Button from '../../utils/Button';
import Input from '../../utils/Input';

export default function ResetPassword() {
    const description = 'Please set a new password for your account';

    function handleSetPassword(event) {
        event.preventDefault();
        console.log('Password submitted');
    }
    return (
        <Auth title="Set a new password" description={description}>
            <div className="input-container column">
                <Input type="password" placeholder="New Password" />
                <Input type="password" placeholder="Confirm New Password" />
            </div>
            <Button onClick={handleSetPassword}>Set password</Button>
        </Auth>
    );
}
