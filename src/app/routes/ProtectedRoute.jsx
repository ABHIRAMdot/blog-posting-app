import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { Loader } from "../../components/ui/Loader";



export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <Loader text="Checking authentication..." />
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}