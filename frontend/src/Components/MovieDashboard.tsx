import { Link } from "react-router-dom";

interface MovieHomeProps {
    id: number | undefined;
    title: string | undefined;
    year: Date;
    rating: number | undefined;
    image: string | undefined;
    quality: string | undefined;
}

export function MovieDashboard(props: MovieHomeProps) {
    const year = props.year instanceof Date ? props.year : new Date(props.year);
    return (
        <>
            <Link to={`/dashboard/movie/${props.id}`} className="card text-decoration-none" style={{ width: '15rem', border: 'none' }} key={props.id}>
                <div className="position-relative">
                    <img src={props.image} className="card-img-top" alt="..." height={'320'} />
                    <div className="position-absolute bottom-0 start-0 p-2">
                        <span className="badge bg-warning">{year.getFullYear()}</span>
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
        </>
    );
}