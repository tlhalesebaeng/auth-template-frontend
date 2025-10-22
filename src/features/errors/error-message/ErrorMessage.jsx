import './ErrorMessage.css';

export default function ErrorMessage({ errorMessage }) {
    return <p className="error">{errorMessage}</p>;
}
