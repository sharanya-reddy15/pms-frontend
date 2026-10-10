import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

function Dashboard() {

    const email =
        localStorage.getItem("email");

    return (
        <>
            <Navbar />

            <main className="container">

                <h1>
                    Welcome to Placement Dashboard
                </h1>

                <p>
                    Logged in as: {email}
                </p>

                <div className="grid">

                    <Link
                        className="dashboard-card"
                        to="/profile"
                    >
                        <h2>
                            Student Profile
                        </h2>

                        <p>
                            Add your academic and
                            personal information.
                        </p>
                    </Link>

                    <Link
                        className="dashboard-card"
                        to="/resume"
                    >
                        <h2>
                            Resume Analysis
                        </h2>

                        <p>
                            Upload your PDF resume
                            and extract skills.
                        </p>
                    </Link>

                    <Link
                        className="dashboard-card"
                        to="/jobs"
                    >
                        <h2>
                            Find Jobs
                        </h2>

                        <p>
                            Search jobs and check
                            AI match scores.
                        </p>
                    </Link>

                    <Link
                        className="dashboard-card"
                        to="/applications"
                    >
                        <h2>
                            Applications
                        </h2>

                        <p>
                            Track your application
                            status.
                        </p>
                    </Link>

                </div>

            </main>
        </>
    );
}

export default Dashboard;
