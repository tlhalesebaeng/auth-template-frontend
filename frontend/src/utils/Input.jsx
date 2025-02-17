import './Input.css';

export default function Input({ type, placeholder }) {
    return (
        <input
            className="long-text-input"
            type={type}
            placeholder={placeholder}
        />
    );
}
