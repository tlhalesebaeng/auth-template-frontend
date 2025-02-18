import { NavLink } from 'react-router-dom';
import './AuthQuestion.css';

export default function AuthQuestion({ children, question, option, name }) {
    let optionUrl;
    if (option === 'Login') {
        optionUrl = '/';
    } else if (option === 'Sign up') {
        optionUrl = '/users/signup';
    } else if (option === 'Resend') {
        //resend the code
    }

    return (
        <div className={`${name} column`}>
            {children}
            <p>
                {question} <NavLink to={optionUrl}>{option}</NavLink>
            </p>
        </div>
    );
}
