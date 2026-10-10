import { useState } from "react";

import Navbar from "../components/Navbar";
import api from "../api";

function Resume() {

    const [file, setFile] =
        useState(null);

    const [result, setResult] =
        useState(null);

    async function upload() {

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

        if (!file) {

            alert(
                "Please select a PDF"
            );

            return;
        }

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        try {

            const response =
                await api.post(
                    `/resumes/upload/${profile.id}`,
                    formData
                );

            setResult(
                response.data
            );

            alert(
                "Resume uploaded successfully"
            );

        } catch (error) {

            alert(
                error.response?.data
                || "Resume upload failed"
            );
        }
    }

    return (
        <>
            <Navbar />

            <main className="container">

                <h1>
                    Resume Upload and Analysis
                </h1>

                <div className="form-card">

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={
                            (event) =>
                                setFile(
                                    event.target.files[0]
                                )
                        }
                    />

                    <button onClick={upload}>
                        Upload Resume
                    </button>

                    {result && (
                        <div>

                            <h3>
                                Extracted Skills
                            </h3>

                            <p>
                                {
                                    result.skills?.join(
                                        ", "
                                    )
                                }
                            </p>

                        </div>
                    )}

                </div>

            </main>
        </>
    );
}

export default Resume;
