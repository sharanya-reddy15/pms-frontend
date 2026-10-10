import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    async function login(event) {

        event.preventDefault();

        try {

            const response =
                await api.post(
                    "/auth/login",
                    {
                        email,
                        password,
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "email",
                response.data.email
            );

            if (response.data.role === "ADMIN") {

                navigate("/admin");

            } else {

                navigate("/dashboard");
            }

        } catch (error) {

            alert(
                error.response?.data?.message
                || "Invalid email or password"
            );
        }
    }

    return (
        <div className="auth-page">

            <form
                className="form-card"
                onSubmit={login}
            >

                <h1>
                    Student Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={
                        (event) =>
                            setEmail(
                                event.target.value
                            )
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={
                        (event) =>
                            setPassword(
                                event.target.value
                            )
                    }
                    required
                />

                <button type="submit">
                    Login
                </button>

                <p>
                    New student?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Login;
