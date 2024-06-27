import { Link } from 'react-router-dom';

export default function NavbarComponent() {
  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to={"/"} className="nav-link px-2 text-secondary">Home</Link></li>
            <li><Link to={"/user"} className="nav-link px-2 text-white">Users</Link></li>
          </ul>

          <div className="text-end">
            <Link to={"/login"} className="btn btn-outline-light me-2">Login</Link>
            <Link to={"/signup"} className="btn btn-warning">Sign-up</Link>
          </div>

        </div>
      </div>
    </header>
  )
}