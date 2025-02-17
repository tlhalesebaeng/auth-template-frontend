import './AuthQuestion.css';

export default function AuthQuestion({ children, question, option }) {
    return (
        <div className="question-container column">
            {children}
            <p>
                {question} <a href="#">{option}</a>
            </p>
        </div>
    );
}
