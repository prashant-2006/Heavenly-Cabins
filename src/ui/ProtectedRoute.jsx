import { useNavigate } from "react-router-dom";
import { useUser } from "../features/Authentication/useUser";
import Spinner from "./Spinner";
import React from "react";
import { useEffect } from "react";

function ProtectedRoute({children}){
    const {isAuthenticated, isLoading} = useUser();
    const navigate = useNavigate();

    useEffect(function(){
        if(!isAuthenticated && !isLoading){
            navigate("/login");
        }
    },[isAuthenticated, isLoading, navigate])

    if(isLoading){
        return (<Spinner />);
    }

    return children;
}

export default ProtectedRoute;