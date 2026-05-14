import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../services/authService"

import { getAuthErrorMessage } from "../../utils/authErrors";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { toast } from "react-toastify";

import "./LoginPage.css";

export const LoginPage = () => {
    
    const [email, setEmail ] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()   // stops browser refresh on form submit.

        setError("")

        try {
            await loginUser(email, password)

            toast.success("Login successful")

            navigate("/blogs")
        } catch (err) {
            const message = getAuthErrorMessage(err.code);
            setError(message);

            toast.error(message);
        }
    }
    
    return (
        <div className="auth-page">
    
            <div className="auth-card">
    
                <h1>Welcome Back</h1>
    
                <p className="auth-subtitle">
                    Login to continue managing your blogs
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
    
                    <Button type="submit"> Login </Button>
    
                </form>
    
                {error && (
                    <p className="auth-error"> {error} </p>
                )}
    
                <p className="auth-footer">
                    Don’t have an account?{" "}
    
                    <Link to="/signup"> Signup </Link>
                </p>
    
            </div>
    
        </div>
    )
}