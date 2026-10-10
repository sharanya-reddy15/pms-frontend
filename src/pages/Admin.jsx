import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../api";

function Admin() {

    const [jobs, setJobs] =
        useState([]);

    const [applications, setApplications] =
        useState([]);

    const [students, setStudents] =
        useState([]);

    const [stats, setStats] = useState(null);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const [
                jobsResponse,
                applicationsResponse,
                studentsResponse,
                statsResponse,
            ] = await Promise.all([
                api.get("/jobs"),
                api.get("/applications"),
                api.get("/students"),
                api.get("/admin/stats"),
            ]);

            setJobs(
                jobsResponse.data
            );

            setApplications(
                applicationsResponse.data
            );

            setStudents(
                studentsResponse.data
            );

            setStats(statsResponse.data);

        } catch {

            alert(
                "Unable to load admin data"
            );
        }
    }

    async function deleteJob(id) {

        if (!window.confirm(
            "Delete this job?"
        )) {
            return;
        }

        await api.delete(
            `/jobs/${id}`
        );

        loadData();
    }

    async function updateStatus(
            id,
            status) {

        await api.put(
            `/applications/${id}/status?status=${status}`
        );

        loadData();
    }

    return (
        <>
            <Navbar />

            <main className="container">

                <h1>
                    Admin Dashboard
                </h1>

                <div className="grid">

                    <div className="stat">
                        <h2>
                            Students
                        </h2>

                        <p>
                            {stats?.students ?? students.length}
                        </p>
                    </div>

                    <div className="stat">
                        <h2>
                            Jobs
                        </h2>

                        <p>
                            {stats?.jobs ?? jobs.length}
                        </p>
                    </div>

                    <div className="stat">
                        <h2>
                            Applications
                        </h2>

                        <p>
                            {stats?.applications ?? applications.length}
                        </p>
                    </div>

                </div>

                <div className="card-grid">
                    <div className="card"><div className="stat-number">{stats?.interviews ?? 0}</div><div className="stat-label">Interviews</div></div>
                    <div className="card"><div className="stat-number">{stats?.users ?? 0}</div><div className="stat-label">Registered Users</div></div>
                </div>

                <h2>
                    Job Management
                </h2>

                {jobs.map((job) => (

                    <div
                        className="job-card"
                        key={job.id}
                    >

                        <h3>
                            {job.title}
                        </h3>

                        <p>
                            {job.company}
                        </p>

                        <button
                            onClick={() =>
                                deleteJob(
                                    job.id
                                )
                            }
                        >
                            Delete Job
                        </button>

                    </div>
                ))}

                <h2>
                    Application Management
                </h2>

                {applications.map(
                    (application) => (

                        <div
                            className="job-card"
                            key={application.id}
                        >

                            <h3>
                                {
                                    application.jobTitle
                                }
                            </h3>

                            <p>
                                Student:{" "}
                                {
                                    application.studentEmail
                                }
                            </p>

                            <p>
                                Current Status:{" "}
                                {
                                    application.status
                                }
                            </p>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        application.id,
                                        "Under Review"
                                    )
                                }
                            >
                                Under Review
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        application.id,
                                        "Shortlisted"
                                    )
                                }
                            >
                                Shortlist
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        application.id,
                                        "Rejected"
                                    )
                                }
                            >
                                Reject
                            </button>

                        </div>
                    )
                )}

            </main>
        </>
    );
}

export default Admin;
