import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../api";

function Applications() {

    const [applications, setApplications] =
        useState([]);

    useEffect(() => {

        const email =
            localStorage.getItem("email");

        if (!email) {
            return;
        }

        api.get(
            `/applications/student/${email}`
        )
            .then((response) =>
                setApplications(
                    response.data
                )
            )
            .catch(() => {});
    }, []);

    return (
        <>
            <Navbar />

            <main className="container">

                <h1>
                    My Applications
                </h1>

                {applications.length === 0 && (
                    <p>
                        No applications found.
                    </p>
                )}

                {applications.map(
                    (application) => (

                        <div
                            className="job-card"
                            key={application.id}
                        >

                            <h2>
                                {
                                    application.jobTitle
                                }
                            </h2>

                            <p>
                                Company:{" "}
                                {
                                    application.company
                                }
                            </p>

                            <p>
                                Match Score:{" "}
                                {
                                    application.matchScore
                                }%
                            </p>

                            <p>
                                Status:{" "}
                                {
                                    application.status
                                }
                            </p>

                        </div>
                    )
                )}

            </main>
        </>
    );
}

export default Applications;
