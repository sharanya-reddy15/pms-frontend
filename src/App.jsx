import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Resume from "./pages/Resume";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";
import Notifications from "./pages/Notifications";
import Admin from "./pages/Admin";
import Recommendations from "./pages/Recommendations";

function App() {

    return (
        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/profile"
                element={<Profile />}
            />

            <Route
                path="/resume"
                element={<Resume />}
            />

            <Route
                path="/jobs"
                element={<Jobs />}
            />

            <Route
                path="/applications"
                element={<Applications />}
            />

            <Route
                path="/interviews"
                element={<Interviews />}
            />

            <Route
                path="/notifications"
                element={<Notifications />}
            />

            <Route
                path="/admin"
                element={<Admin />}
            />

            <Route
                path="/recommendations"
                element={<Recommendations />}
            />

        </Routes>
    );
}

export default App;
