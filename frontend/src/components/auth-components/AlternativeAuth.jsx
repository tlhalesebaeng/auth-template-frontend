import './AlternativeAuth.css';
import AuthLogo from './AuthLogo';
import googleLogo from '../../assets/search-logo.png';
import facebookLogo from '../../assets/facebook-logo.png';
import twitterLogo from '../../assets/twitter-logo.png';

export default function AlternativeAuth({ alt }) {
    return (
        <>
            <section className="line-container column">
                <p>Or {alt} with</p>
                <hr />
            </section>
            <section className="third-party-logo-container row">
                <AuthLogo logoSrc={googleLogo} />
                <AuthLogo logoSrc={facebookLogo} />
                <AuthLogo logoSrc={twitterLogo} />
            </section>
        </>
    );
}
