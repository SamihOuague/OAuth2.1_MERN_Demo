import React, { useState } from "react";
import { PKCEComponent, SubmitComponent } from "../../PKCE/PKCEComponents";
import { Link } from "react-router-dom";

function Register() {
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
            <h1>Register</h1>
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={(e) => handleSubmit(e)}>
                <input type="email" placeholder="Your email" name="email" style={{ margin: "8px 0" }} />
                <input type="password" placeholder="Your password" name="password" style={{ margin: "8px 0" }} />
                <PKCEComponent />
                <SubmitComponent dataForm={dataForm} btnValue={"Register"} path={"http://localhost:3001/login"}/>
            </form>
            <Link to="/">Home</Link>
        </div>
    );
}

export default Register;