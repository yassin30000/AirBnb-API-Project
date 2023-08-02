// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./LoginForm.css";

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [demoLogin, setDemoLogin] = useState(false);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (demoLogin) return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }));

        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                console.log('DATA: ', data)
                if (data && data.message) {

                    setErrors({ message: data.message });
                    console.log('ERRORS: ', errors)
                }
            }
        );
    };

    return (
        <div className="form-container">
            <form className='loginForm' onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <div className="log-in-errors">
                    {errors && <p>{errors.message}</p>}
                </div>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" id="submit-login-form-btn">Log In</button>
                <button type="submit" id="demo-user-login-btn" onClick={()=> setDemoLogin(true)}>Log in as demo user</button>
            </form>
        </div>
    );
}

export default LoginFormPage;
