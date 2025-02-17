import './Auth.css';

export default function Auth({ title, children }) {
    return (
        <main className="auth-card column">
            <h1>{title}</h1>
            <section>{children}</section>
        </main>
    );
}
