import React, { useState } from "react";
import { Resources, Spinner } from "./Resources";
import { sha256 } from "js-sha256";

function Register() {
    const [dataForm, setDataForm] = useState(null);
    const [nonce] = useState(String(Math.floor(Math.random() * (Math.pow(10, 10)))));
    const [msg] = useState(null);
    if (dataForm) {
        return (
            <Resources path={"http://localhost:3001/register"} options={{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": dataForm.token,
                },
                body: JSON.stringify({ ...dataForm, token: null }),
            }} render={(data) => {
                console.log(data);
                if (data.loading) return <Spinner />;
                else if (!data.payload || data.errorCode) {
                    return (
                        <h2>ERROR - 500</h2>
                    );
                } else if (!data.payload.success) return <h2>{data.payload.message}</h2>
                localStorage.setItem("token", data.payload.token);
                return (
                    <h2>{data.payload.token}</h2>
                );
            }} />
        );
    }
    return (
        <div>
            <h1>Register</h1>
            <Resources path={`http://localhost:3001/get-pkce?nonce=${sha256(nonce)}`} render={(data) => {
                if (data.loading) return <Spinner />
                else if (!data.payload || !data.payload.token || data.errorCode) {
                    return (
                        <h2>ERROR - 500</h2>
                    );
                }
                return (
                    <form style={{ display: "flex", flexDirection: "column" }} onSubmit={(e) => {
                        e.preventDefault();
                        const { email, password, nonce, token } = e.target;
                        setDataForm({
                            email: email.value,
                            password: password.value,
                            nonce: nonce.value,
                            token: token.value,
                        });
                    }}>
                        <input type="email" placeholder="Your email" name="email" style={{ margin: "8px 0" }} />
                        <input type="password" placeholder="Your password" name="password" style={{ margin: "8px 0" }} />
                        <input type="password" placeholder="Confirm your password" name="c_password" style={{ margin: "8px 0" }} />
                        <input type="text" name="nonce" defaultValue={nonce} disabled />
                        <input type="text" name="token" defaultValue={data.payload.token} style={{ margin: "8px 0" }} disabled />
                        <p style={{ color: "white" }}>{msg}</p>
                        <button type="submit" style={{ margin: "8px 0" }}>Register</button>
                    </form>
                );
            }} />
        </div>
    );
}

export default Register;