import { useNavigate } from 'react-router-dom';
import './Back.css';

export default function Back({ title }) {
    const navigate = useNavigate();

    function handleBackBtn() {
        navigate('/');
    }
    return (
        <div onClick={handleBackBtn} className="back-container row">
            <p>{'<'}</p>
            <h3>{title}</h3>
        </div>
    );
}
