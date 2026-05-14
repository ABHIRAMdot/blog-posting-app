import { Link, useNavigate } from "react-router-dom";

import { logoutUser } from "../../services/authService";

import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";



export const Navbar = () => {
    const navigate = useNavigate();

    const { user } = useAuth();

    const handleLogout = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to logout?"
        );
    
        if (!confirmed) {
            return;
        }

        
        try {
            await logoutUser();
            navigate("/login")
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <nav className="navbar">

            <div className="container navbar-content">

                <Link to="/" className="logo">BlogSpace</Link>

                <div className="nav-links">

                    {!user ? (
                        <>
                        
                        <Link to="/">Home</Link>

                        <Link to="/login">Login</Link>

                        <Link to="/signup">Signup</Link>
                        </>
                    ) : (

                        <>
                        <p className="user-email">
                            {user.email}
                        </p>
                        <Link to="/blogs">Blogs</Link>

                        <Link to="/blogs/new">Add Blog</Link>

                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                        
                        </>

                    )}

                </div>

            </div>

        </nav>
    );
}