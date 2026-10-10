import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../api";

function Notifications() {

    const [notifications, setNotifications] =
        useState([]);

    useEffect(() => {

        const email =
            localStorage.getItem("email");

        if (!email) {
            return;
        }

        loadNotifications(email);

    }, []);

    async function loadNotifications(email) {

        try {

            const response =
                await api.get(
                    `/notifications/${email}`
                );

            setNotifications(
                response.data
            );

        } catch {

            alert(
                "Unable to load notifications"
            );
        }
    }

    async function markRead(id) {

        await api.put(
            `/notifications/${id}/read`
        );

        setNotifications(
            notifications.map(
                (notification) =>
                    notification.id === id
                        ? {
                            ...notification,
                            readStatus: true,
                        }
                        : notification
            )
        );
    }

    return (
        <>
            <Navbar />

            <main className="container">

                <h1>
                    Notifications
                </h1>

                {notifications.map(
                    (notification) => (

                        <div
                            className="job-card"
                            key={notification.id}
                        >

                            <p>
                                {
                                    notification.message
                                }
                            </p>

                            <p>
                                {
                                    notification.createdAt
                                }
                            </p>

                            {!notification.readStatus && (
                                <button
                                    onClick={() =>
                                        markRead(
                                            notification.id
                                        )
                                    }
                                >
                                    Mark as Read
                                </button>
                            )}

                        </div>
                    )
                )}

            </main>
        </>
    );
}

export default Notifications;
