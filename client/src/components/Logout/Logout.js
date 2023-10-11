import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import * as AuthService from '../../services/authService'
import { useNavigate } from "react-router-dom";

export const Logout = () => {


    const {user, userLogout} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.logout(user.accessToken)
            .then(() => {
                userLogout()
                navigate('/')
            })
            .catch(() => {
                navigate('/')
            })
    })
}