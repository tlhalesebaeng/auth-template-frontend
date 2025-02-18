import shownPassword from '../assets/shown-password-logo.png';
import hiddenPassword from '../assets/hidden-password-logo.png';
import './Input.css';
import { useState } from 'react';

export default function Input({ type = 'text', placeholder }) {
    const [inputType, setInputType] = useState(type);
    const [inputLogo, setInputLogo] = useState(hiddenPassword);

    function handleInputLogo() {
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

    return (
        <div className="input-group">
            <input type={inputType} placeholder=" " />
            <label htmlFor="">{placeholder}</label>
            {type === 'password' && (
                <img onClick={handleInputLogo} src={inputLogo} />
            )}
        </div>
    );
}
