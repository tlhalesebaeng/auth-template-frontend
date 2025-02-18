import './Input.css';

export default function Input({ type, placeholder }) {
    return (
        <div className="input-group">
            <input type={type} placeholder=" " />
            <label for="">{placeholder}</label>
        </div>
    );
}
