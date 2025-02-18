import './AlternativeAuth.css';
import AuthLogo from './AuthLogo';
import googleLogo from '../../assets/search-logo.png';
import facebookLogo from '../../assets/facebook-logo.png';
import twitterLogo from '../../assets/twitter-logo.png';

export default function AlternativeAuth({ alt, action }) {
    function handleGoogleAuth() {
        console.log(`${action} with google`);
    }

    function handleFacebookAuth() {
        console.log(`${action} with facebook`);
    }

    function handleTwitterAuth() {
        console.log(`${action} with twitter`);
    }
    return (
        <>
            <section className="line-container column">
                <p>Or {alt} with</p>
                <hr />
            </section>
            <section className="third-party-logo-container row">
                <AuthLogo onClick={handleGoogleAuth} logoSrc={googleLogo} />
                <AuthLogo onClick={handleFacebookAuth} logoSrc={facebookLogo} />
                <AuthLogo onClick={handleTwitterAuth} logoSrc={twitterLogo} />
            </section>
        </>
    );
}
