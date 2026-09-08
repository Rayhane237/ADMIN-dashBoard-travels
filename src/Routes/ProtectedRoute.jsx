import { Navigate ,Outlet} from "react-router-dom";
import { useAuth} from "../context/AuthContext";

export default function ProtectedRoute() {
    const { accessToken , role ,isLoading } = useAuth();

    if(isLoading){
        return null; // or a loading spinner
    }

    if(!accessToken || role !== "admin"){
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}