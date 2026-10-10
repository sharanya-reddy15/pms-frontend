import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../api";

function Jobs() {

    const [jobs, setJobs] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [matches, setMatches] =
        useState({});

    useEffect(() => {

        loadJobs();

    }, []);

    async function loadJobs() {

        try {

            const response =
                await api.get("/jobs");

            setJobs(response.data);

        } catch {

            alert(
                "Unable to load jobs"
            );
        }
    }

    async function checkMatch(job) {

        const profile =
            JSON.parse(
                localStorage.getItem(
                    "studentProfile"
                )
            );

        if (!profile?.id) {

            alert(
                "Please complete your profile first"
            );

            return;
        }

        try {

            const response =
                await api.get(
                    `/ai/match/${profile.id}/${job.id}`
                );

            setMatches({
                ...matches,
                [job.id]:
                    response.data,
            });

        } catch {

            alert(
                "Unable to calculate match"
            );
        }
    }

    async function apply(job) {

        const profile =
            JSON.parse(
                localStorage.getItem(
                    "studentProfile"
                )
            );

        if (!profile?.id) {

            alert(
                "Please save your profile first"
            );

            return;
        }

        try {

            let match =
                matches[job.id];

            if (!match) {

                const response =
                    await api.get(
                        `/ai/match/${profile.id}/${job.id}`
                    );

                match =
                    response.data;
            }

            await api.post(
                "/applications",
                {
                    studentId:
                        profile.id,

                    jobId:
                        job.id,

                    studentEmail:
                        profile.email,

                    jobTitle:
                        job.title,

                    company:
                        job.company,

                    matchScore:
                        match.matchScore,
                }
            );

            alert(
                "Application submitted"
            );

        } catch (error) {

            alert(
                error.response?.data
                || "Unable to apply"
            );
        }
    }

    const filtered =
        jobs.filter((job) =>
            `${job.title} ${job.company}`
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <>
            <Navbar />

            <main className="container">

                <h1>
                    Available Jobs
                </h1>

                <input
                    className="search"
                    placeholder="Search jobs..."
                    value={search}
                    onChange={
                        (event) =>
                            setSearch(
                                event.target.value
                            )
                    }
                />

                <div className="job-list">

                    {filtered.map((job) => (

                        <div
                            className="job-card"
                            key={job.id}
                        >

                            <h2>
                                {job.title}
                            </h2>

                            <h3>
                                {job.company}
                            </h3>

                            <p>
                                {job.description}
                            </p>

                            <p>
                                <b>
                                    Skills:
                                </b>{" "}
                                {job.requiredSkills}
                            </p>

                            <p>
                                Location:{" "}
                                {job.location}
                            </p>

                            <p>
                                Salary:{" "}
                                {job.salary}
                            </p>

                            {matches[job.id] && (
                                <div className="match">

                                    <b>
                                        AI Match:
                                    </b>{" "}
                                    {
                                        matches[
                                            job.id
                                        ].matchScore
                                    }%

                                    <p>
                                        Skill gaps:{" "}
                                        {
                                            matches[
                                                job.id
                                            ].skillGaps.join(
                                                ", "
                                            )
                                        }
                                    </p>

                                </div>
                            )}

                            <button
                                onClick={() =>
                                    checkMatch(job)
                                }
                            >
                                Check AI Match
                            </button>

                            <button
                                onClick={() =>
                                    apply(job)
                                }
                            >
                                Apply
                            </button>

                        </div>

                    ))}

                </div>

            </main>
        </>
    );
}

export default Jobs;
