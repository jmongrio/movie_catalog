export function LoadingComponent() {
    return (
        <div className="min-vh-100 d-flex z-3">
            <div className="mx-auto my-auto">
                <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}