import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    function change(event) {

        setForm({
            ...form,
            [event.target.name]:
                event.target.value,
        });
    }

    async function register(event) {

        event.preventDefault();

        try {

            await api.post(
                "/auth/register",
                form
            );

            alert(
                "Registration successful"
            );

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data
                || "Registration failed"
            );
        }
    }

    return (
        <div className="auth-page">

            <form
                className="form-card"
                onSubmit={register}
            >

                <h1>
                    Student Registration
                </h1>

                <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={change}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={change}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={change}
                    required
                />

                <button type="submit">
                    Register
                </button>

                <p>
                    Already registered?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Register;
