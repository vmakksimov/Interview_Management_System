import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import img_login from '../../styles/images/login.png'
import friends from '../../styles/images/friends7.jpg'
import { login } from '../../services/authService'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'



export const Login = () => {

    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogin = (e) => {

        e.preventDefault()
        const { username, password } = Object.fromEntries(new FormData(e.target))
        let url = 'http://127.0.0.1:8000/api/login/';
        axios.defaults.withCredentials = true
        axios.post(url, { username, password }, {
            withCredentials: true,
            // crossDomain: true,
            headers: {
                // "X-CSRFToken": axios.get('accessToken'),
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                userLogin(res.data)
                navigate('/')
            })
            .catch(err => console.log(err))


        // login(username, password)
        //     .then(res => {
        //         userLogin(res)
        //         navigate('/')

        //     })
    }
    return (
        <article className='login-page-image'>
            <img src={friends} alt="" className='background-image-login' />
            <article className="login-page">
                <img src={img_login} alt="" />
                <section className="form-title"><h1>SIGN IN</h1></section>
                <section className="login-page-details">
                    <form className="login-form" method="POST" onSubmit={onLogin}>
                        <div className="user-details">
                            <input type='text' name="username" placeholder='username'></input>
                        </div>
                        <div className="user-details">
                            <input type='password' name="password" placeholder='password'></input>
                        </div>
                        <div className="user-details">
                            <input type='password' name="re_password" placeholder='confirm password'></input>
                        </div>
                        <div className="form-button">
                            <input type="submit" value="SIGN IN" />
                        </div>
                        <h3 className='account-h3'>Don't have an account? <Link to='/register'>SIGN UP here</Link></h3>
                    </form>
                </section>
            </article>
        </article>
    )
}