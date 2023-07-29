import React from "react"
import { useAuth } from '../context/AuthContext'
import { Redirect } from 'react-router-dom'


const ProtectPage = () => {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated){
        return <Redirect to="/login" />
    }

    return (<div>Bu sahifa himoyalangan</div>)
}