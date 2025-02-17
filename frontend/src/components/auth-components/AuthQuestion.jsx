import './AuthQuestion.css';

export default function AuthQuestion({ children, question, option, name }) {
    return (
        <div className={`${name} column`}>
            {children}
            <p>
                {question} <a href="#">{option}</a>
            </p>
        </div>
    );
}
