import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { Resources, Spinner } from "../Resources";

function Auth() {
    return (
        <div className="auth">
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
            <Resources path={"http://localhost:3001/ping"} options={{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Barear ${localStorage.getItem("token")}`,
                }
            }} render={(data) => {
                if (data.loading) return <Spinner />
                else if (data.payload && data.payload.success) return <Navigate to="/"/>
                localStorage.removeItem("token");
                return <></>
            }}/>
        </div>
    );
}

export default Auth;