import shownPassword from '../assets/shown-password-logo.png';
import hiddenPassword from '../assets/hidden-password-logo.png';
import './Input.css';
import { useRef, useState } from 'react';

export default function Input({ type = 'text', placeholder, rightMargin }) {
    const [inputType, setInputType] = useState(type);
    const [inputLogo, setInputLogo] = useState(hiddenPassword);
    const inputRef = useRef();

    function handleInputLogo() {
        if (inputRef.current.value !== '') {
            setInputType((prevState) => {
                if (prevState === 'password') {
                    return 'text';
                }

                return 'password';
            });
            setInputLogo((prevState) => {
                if (prevState === shownPassword) {
                    return hiddenPassword;
                }

                return shownPassword;
            });
        }
    }

    return (
        <div className={`${rightMargin} input-group`}>
            <input
                ref={inputRef}
                type={inputType}
                placeholder=" "
                autoComplete="on"
                name={type}
            />
            <label htmlFor="">{placeholder}</label>
            {type === 'password' && (
                <img onClick={handleInputLogo} src={inputLogo} />
            )}
        </div>
    );
}
