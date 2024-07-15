import { Link } from "react-router-dom";

interface MovieHomeProps {
    title: string;
    year: number;
    rating: number;
    image: string;
    quality: string;
}

export function MovieHome(props: MovieHomeProps) {
    return (
        <Link to={"/"} className="card text-decoration-none" style={{ width: '15rem', border: 'none' }}>
            <div className="position-relative">
                <img src={props.image} className="card-img-top" alt="..." />
                <div className="position-absolute bottom-0 start-0 p-2">
                    <span className="badge bg-warning">{props.year}</span>
                </div>
                <div className="position-absolute top-0 start-0 p-2">
                    <span className="badge bg-danger">{props.quality}</span>
                </div>
                <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge bg-primary">{props.rating}</span>
                </div>
            </div>
            <h5 className="card-title h4">{props.title}</h5>
        </Link>
    );
}