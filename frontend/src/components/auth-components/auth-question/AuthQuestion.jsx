import './AuthQuestion.css';

export default function AuthQuestion(props) {
    const { children, question, name, onClick, linkText } = props;
    return (
        <div className={`${name} column`}>
            {children}
            <p>
                {question} <a onClick={onClick}>{linkText}</a>
            </p>
        </div>
    );
}
