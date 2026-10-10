import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    function logout() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <div className="brand">AI Placement System</div>

            <div className="nav-links">
                {role === "ADMIN" ? (
                    <Link to="/admin">Admin Dashboard</Link>
                ) : (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/resume">Resume</Link>
                        <Link to="/jobs">Jobs</Link>
                        <Link to="/recommendations">AI Jobs</Link>
                        <Link to="/applications">Applications</Link>
                        <Link to="/interviews">Interviews</Link>
                        <Link to="/notifications">Notifications</Link>
                    </>
                )}
                <button className="nav-button" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
