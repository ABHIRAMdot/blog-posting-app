import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../../services/authService";

import { getAuthErrorMessage } from "../../utils/authErrors";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { toast } from "react-toastify";

import "./LoginPage.css"

export const SignupPage = () => {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            await signupUser(email, password);

            toast.success("Account created successfully");

            navigate("/blogs");
        } catch (err) {
            const message = getAuthErrorMessage(err.code);
            setError(message);
            toast.error(message);
        }

    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Create Accout</h1>

                <p className="auth-subtitle">
                    Start Sharing your ideas Today
                </p>

                <form onSubmit={handleSubmit} className="auth-form">

                    <Input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                    <Input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit"> Create Account</Button>

                </form>

                {error && (
                    <p className="auth-error"> {error} </p>
                )}


                <p className="auth-footer"> Already have an Account? {" "}

                    <Link to="/login"> Login </Link>
                </p>
            </div>
        </div>
    )
}