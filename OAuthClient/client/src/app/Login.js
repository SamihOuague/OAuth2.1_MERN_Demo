import React, { useState } from "react";
import { Resources, Spinner } from "./Resources";
import { sha256 } from "js-sha256";
import { Navigate } from "react-router-dom";

const SubmitComponent = ({ dataForm }) => {
    return (!dataForm) ? <button type="submit">Login</button> :
        <Resources path={"http://localhost:3001/login"}
            options={{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": dataForm.token,
                },
                body: JSON.stringify({ ...dataForm, token: null }),
            }}
            render={(data) => {
                if (data.loading) return <Spinner />;
                else if (!data.payload || data.errorCode) {
                    return (
                        <p>ERROR - 500</p>
                    );
                } else if (!data.payload.success) {
                    return (
                        <>
                            <p style={{ fontSize: "13px", margin: "0", color: "red" }}>{data.payload.message}</p>
                            <button type="submit">Login</button>
                        </>
                    )
                }
                localStorage.setItem("token", data.payload.token);
                return <Navigate to={"/"} />
            }}
        />
}

const PKCEComponent = () => {
    const nonce = String(Math.floor(Math.random() * (Math.pow(10, 10))));
    return (
        <Resources path={`http://localhost:3001/get-pkce?nonce=${sha256(nonce)}`} render={(data) => {
            if (data.loading) return <Spinner />
            else if (!data.payload || !data.payload.token) {
                return <p>Error PKCE</p>;
            }
            return (
                <>
                    <input type="text" name="nonce" value={nonce} style={{ margin: "8px 0" }} disabled />
                    <input type="text" name="token" value={data.payload.token} style={{ margin: "8px 0" }} disabled />
                </>
            );
        }} />
    );
}

function Login() {
    const [dataForm, setDataForm] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, nonce, token } = e.target;
        const data = {
            email: email.value,
            password: password.value,
            nonce: nonce.value,
            token: token.value,
        };
        setDataForm(data);
    }

    return (
        <div>
            <h1>Login</h1>
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={(e) => handleSubmit(e)}>
                <input type="email" placeholder="Your email" name="email" style={{ margin: "8px 0" }} />
                <input type="password" placeholder="Your password" name="password" style={{ margin: "8px 0" }} />
                <PKCEComponent />
                <SubmitComponent dataForm={dataForm} />
            </form>
        </div>
    );
}

export default Login;