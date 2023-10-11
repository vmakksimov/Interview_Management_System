import * as request from './requester'

const baseUrl = 'http://127.0.0.1:8000/api'

export const login = (username, password) => request.post(`${baseUrl}/login/`, { username, password })
export const register = (username, email, first_name, last_name, password, password2) => request.post(`${baseUrl}/register/`, { username, email, first_name, last_name, password, password2})
export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/logout/`, {
            headers :{
                'Authorization': accessToken
            }
        })

        console.log('first')

        return response;
    } catch (error){
        console.log(error)
    }
}