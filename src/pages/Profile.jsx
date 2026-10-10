import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../api";

const emptyProfile = {
    name: "",
    email: "",
    phone: "",
    college: "",
    branch: "",
    cgpa: "",
    graduationYear: "",
    skills: "",
    projects: "",
    certifications: "",
    experience: "",
};

function Profile() {

    const [profile, setProfile] =
        useState(emptyProfile);

    const [profileId, setProfileId] =
        useState(null);

    useEffect(() => {

        const email =
            localStorage.getItem("email");

        if (!email) {
            return;
        }

        api.get(
            `/students/email/${email}`
        )
            .then((response) => {

                if (response.data) {

                    setProfile(
                        response.data
                    );

                    setProfileId(
                        response.data.id
                    );
                }
            })
            .catch(() => {});
    }, []);

    function change(event) {

        setProfile({
            ...profile,
            [event.target.name]:
                event.target.value,
        });
    }

    async function save(event) {

        event.preventDefault();

        const data = {
            ...profile,
            cgpa: Number(profile.cgpa),
            graduationYear:
                Number(profile.graduationYear),
        };

        try {

            let response;

            if (profileId) {

                response =
                    await api.put(
                        `/students/${profileId}`,
                        data
                    );

            } else {

                response =
                    await api.post(
                        "/students",
                        data
                    );

                setProfileId(
                    response.data.id
                );
            }

            localStorage.setItem(
                "studentProfile",
                JSON.stringify(
                    response.data
                )
            );

            alert(
                "Profile saved successfully"
            );

        } catch (error) {

            alert(
                "Unable to save profile"
            );
        }
    }

    return (
        <>
            <Navbar />

            <main className="container">

                <h1>
                    Student Profile
                </h1>

                <form
                    className="form-card wide"
                    onSubmit={save}
                >

                    {[
                        ["name", "Name"],
                        ["email", "Email"],
                        ["phone", "Phone"],
                        ["college", "College"],
                        ["branch", "Branch"],
                        ["cgpa", "CGPA"],
                        [
                            "graduationYear",
                            "Graduation Year",
                        ],
                    ].map(
                        ([name, label]) => (
                            <input
                                key={name}
                                name={name}
                                placeholder={label}
                                value={
                                    profile[name]
                                }
                                onChange={change}
                                required={
                                    name === "name"
                                    || name === "email"
                                }
                            />
                        )
                    )}

                    <textarea
                        name="skills"
                        placeholder="Skills: Java, Python, React, MySQL"
                        value={profile.skills}
                        onChange={change}
                    />

                    <textarea
                        name="projects"
                        placeholder="Projects"
                        value={profile.projects}
                        onChange={change}
                    />

                    <textarea
                        name="certifications"
                        placeholder="Certifications"
                        value={
                            profile.certifications
                        }
                        onChange={change}
                    />

                    <textarea
                        name="experience"
                        placeholder="Experience"
                        value={
                            profile.experience
                        }
                        onChange={change}
                    />

                    <button type="submit">
                        Save Profile
                    </button>

                </form>

            </main>
        </>
    );
}

export default Profile;
