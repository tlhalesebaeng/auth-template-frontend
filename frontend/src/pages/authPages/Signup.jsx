import AlternativeAuth from '../../components/auth-components/AlternativeAuth';
import Auth from '../../components/auth-components/Auth';
import AuthQuestion from '../../components/auth-components/AuthQuestion';
import RememberMe from '../../components/auth-components/RememberMe';
import Button from '../../utils/Button';
import Input from '../../utils/Input';

export default function Signup() {
    const description = 'Set up a new account for your profile';
    return (
        <Auth title="Sign up" description={description}>
            <form>
                <div className="input-container column">
                    <div className="row">
                        <Input
                            rightMargin="right-margin"
                            type="text"
                            placeholder="First Name"
                        />
                        <Input type="text" placeholder="Last Name" />
                    </div>
                    <div className="row">
                        <Input
                            rightMargin="right-margin"
                            type="text"
                            placeholder="Email"
                        />
                        <Input type="text" placeholder="Username" />
                    </div>
                    <Input type="password" placeholder="Password" />
                    <Input type="password" placeholder="Confirm Password" />
                </div>
                <AuthQuestion
                    question="Already have an account?"
                    option="Login"
                    name="question-container"
                >
                    <Button>Create account</Button>
                </AuthQuestion>
            </form>
            <AlternativeAuth alt="Signup" />
        </Auth>
    );
}
