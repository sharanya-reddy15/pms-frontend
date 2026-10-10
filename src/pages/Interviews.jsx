import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../api";

function Interviews() {

    const [interviews, setInterviews] =
        useState([]);

    useEffect(() => {

        const email =
            localStorage.getItem("email");

        if (!email) {
            return;
        }

        api.get(
            `/interviews/student/${email}`
        )
            .then((response) =>
                setInterviews(
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
                    Interviews
                </h1>

                {interviews.length === 0 && (
                    <p>
                        No interviews scheduled.
                    </p>
                )}

                {interviews.map(
                    (interview) => (

                        <div
                            className="job-card"
                            key={interview.id}
                        >

                            <h2>
                                {
                                    interview.jobTitle
                                }
                            </h2>

                            <p>
                                Company:{" "}
                                {
                                    interview.company
                                }
                            </p>

                            <p>
                                Date:{" "}
                                {
                                    interview.interviewDate
                                }
                            </p>

                            <p>
                                Mode:{" "}
                                {interview.mode}
                            </p>

                            <p>
                                Status:{" "}
                                {interview.status}
                            </p>

                            {interview.meetingLink && (
                                <a
                                    href={
                                        interview.meetingLink
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Join Meeting
                                </a>
                            )}

                        </div>
                    )
                )}

            </main>
        </>
    );
}

export default Interviews;
