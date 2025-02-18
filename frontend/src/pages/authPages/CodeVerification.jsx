import Auth from '../../components/auth-components/Auth';
import AuthQuestion from '../../components/auth-components/AuthQuestion';
import Input from '../../utils/Input';
import Button from '../../utils/Button';

export default function CodeVerification() {
    const description = 'Enter the one time code sent to your email.';
    return (
        <Auth
            title="Verify Code"
            description={description}
            backTitle="Back to login"
        >
            <form>
                <div className="input-container column">
                    <Input type="text" placeholder="Enter Code" />
                </div>
                <AuthQuestion
                    question="Didn't receive the code?"
                    option="Resend"
                    name="other-question-container"
                ></AuthQuestion>
                <Button>Submit</Button>
            </form>
        </Auth>
    );
}
