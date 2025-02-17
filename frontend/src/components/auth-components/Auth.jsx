import './Auth.css';

export default function Auth({ children, title, description }) {
    return (
        <main className="auth-card column">
            <h1>{title}</h1>
            <p className="description">{description}</p>
            <section>{children}</section>
        </main>
    );
}
