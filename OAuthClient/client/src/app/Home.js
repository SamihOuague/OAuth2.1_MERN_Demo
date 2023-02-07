import React from "react";
import { Resources, Spinner } from "./Resources";
import { Link } from "react-router-dom";

function Home() {
    const token = localStorage.getItem("token");
    return (
        <div>
            <h1>Home</h1>
            <Resources path={"http://localhost:3001/ping"}
                options={{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Barear ${token}`,
                    }
                }}
                render={(data) => {
                    if (data.loading) return <Spinner />
                    else if (!data.payload || data.errorCode) {
                        return (
                            <h2>Error - 500</h2>
                        );
                    }
                    if (!data.payload.success && token) localStorage.removeItem("token");
                    return (
                        <div>
                            <h2>Home Page</h2>
                            {(!data.payload.success) &&
                                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <Link to="/auth/login">Login</Link>
                                    <Link to="/auth/register">Register</Link>
                                </div>
                            }
                        </div>
                    );
                }} />
        </div>
    );
}

export default Home;