import './Button.css';

export default function Button({ children, onClick }) {
    return (
        <button onClick={onClick} className="submit-btn">
            {children}
        </button>
    );
}
