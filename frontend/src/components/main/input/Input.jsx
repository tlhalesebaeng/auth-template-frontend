import { useRef, useState } from 'react';
import shownPassword from '../../../assets/shown-password-logo.png';
import hiddenPassword from '../../../assets/hidden-password-logo.png';
import './Input.css';

export default function Input({
    onChange,
    type = 'text',
    placeholder,
    rightMargin,
}) {
    const [inputType, setInputType] = useState(type);
    const [inputLogo, setInputLogo] = useState(hiddenPassword);
    const inputRef = useRef();

    function handleInputLogo() {
        if (inputRef.current.value !== '') {
            setInputType((prevState) =>
                prevState === 'password' ? 'text' : 'password'
            );
            setInputLogo((prevState) =>
                prevState === shownPassword ? hiddenPassword : shownPassword
            );
        }
    }

    return (
        <div className={`${rightMargin} input-group`}>
            <input
                onChange={onChange}
                ref={inputRef}
                type={inputType}
                placeholder=" "
                autoComplete="on"
            />
            <label htmlFor="">{placeholder}</label>
            {type === 'password' && (
                <img onClick={handleInputLogo} src={inputLogo} />
            )}
        </div>
    );
}
