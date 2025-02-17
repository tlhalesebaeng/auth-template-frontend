import './AlternativeAuth.css';

export default function AlternativeAuth({ alt }) {
    return (
        <>
            <section className="line-container column">
                <p>Or {alt} with</p>
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
        </>
    );
}
