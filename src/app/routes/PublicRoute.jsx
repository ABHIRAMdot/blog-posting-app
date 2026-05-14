import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { Loader } from "../../components/ui/Loader";

export const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Loader text="Checking authentcation..." />
        );
    }

    if (user){
        return <Navigate to="/blogs" replace />
    }

    return children;
}