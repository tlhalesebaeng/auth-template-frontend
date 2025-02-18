import './AuthLogo.css';

export default function AuthLogo({ logoSrc, onClick }) {
    return (
        <button onClick={onClick} className="center">
            <img src={logoSrc} />
        </button>
    );
}
