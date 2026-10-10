import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";

function Recommendations() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem("studentProfile"));
        if (!profile?.id) {
            setLoading(false);
            return;
        }

        api.get(`/ai/recommendations/${profile.id}`)
            .then((response) => setItems(response.data))
            .catch(() => alert("Unable to load recommendations"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Navbar />
            <main className="page">
                <h1 className="page-title">AI Job Recommendations</h1>
                <p className="page-subtitle">Jobs are ordered using your profile skills and eligibility.</p>

                {!loading && items.length === 0 && (
                    <div className="empty-state">Complete your profile first to receive recommendations.</div>
                )}

                <div className="job-grid">
                    {items.map((item) => (
                        <div className="job-card" key={item.job.id}>
                            <h3>{item.job.title}</h3>
                            <div className="job-company">{item.job.company}</div>
                            <p className="job-description">{item.job.description}</p>
                            <div className="score">AI Match: {item.matchScore}%</div>
                            <p><b>Required:</b> {item.job.requiredSkills}</p>
                            <p><b>Skill gaps:</b> {(item.skillGaps || []).join(", ") || "None"}</p>
                            <span className="badge">{item.eligible ? "Eligible" : "Check Eligibility"}</span>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export default Recommendations;
