import Back from '../Back';
import './Auth.css';

export default function Auth({ children, title, description, backTitle }) {
    return (
        <main className="auth-card column">
            {backTitle && <Back title={backTitle} />}
            <h1>{title}</h1>
            <p className="description">{description}</p>
            <section>{children}</section>
        </main>
    );
}
