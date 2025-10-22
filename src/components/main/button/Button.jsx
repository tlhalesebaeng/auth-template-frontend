import './Button.css';

export default function Button({ disabledButton, children, onClick }) {
    return (
        <button
            disabled={disabledButton}
            onClick={onClick}
            className={disabledButton ? 'reduced-opacity-btn' : 'submit-btn'}
        >
            {children}
        </button>
    );
}
