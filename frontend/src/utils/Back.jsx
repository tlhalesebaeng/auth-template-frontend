import './Back.css';

export default function Back({ title }) {
    return (
        <div className="back-container row">
            <p>{'<'}</p>
            <h3>{title}</h3>
        </div>
    );
}
