import './Auth.css';

export default function Auth({ title, children }) {
    return (
        <main className="auth-card column">
            <h1>{title}</h1>
            <section>
                <form>{children}</form>
                <section className="line-container column">
                    <p>Or {title} with</p>
                    <hr />
                </section>
                <section className="third-party-logo-container row">
                    <button className="center">
                        <img src="#" />
                    </button>
                    <button className="center">
                        <img src="#" />
                    </button>
                    <button className="center">
                        <img src="#" />
                    </button>
                </section>
            </section>
        </main>
    );
}
