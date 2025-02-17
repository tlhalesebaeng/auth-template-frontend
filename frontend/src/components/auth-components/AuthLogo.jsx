import './AuthLogo.css';

export default function AuthLogo({ logoSrc }) {
    return (
        <button className="center">
            <img src={logoSrc} />
        </button>
    );
}
