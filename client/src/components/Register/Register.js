import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import * as AuthService from '../../services/authService'
import * as UserService from '../../services/userService'
import { AuthContext } from '../context/AuthContext'
import { validateEmail } from '../../Validation/Validators'


export const Register = () => {
    const [shownPassword, setShownPassword] = useState('password')
    const [shownRePassword, setShownRePassword] = useState('password')
    const [passwordInput, setPasswordInput] = useState("");
    const [rePasswordInput, setRePasswordInput] = useState("");
    const { userLogin } = useContext(AuthContext)

    const navigate = useNavigate()
    const [errors, setError] = useState({})
    const [values, setValues] = useState({
        checkbox: '',
        username: '',
        exists: '',
        email: '',
        emailExists: '',
        first_name: '',
        last_name: '',
        password_characters: '',
        password_upper: '',
        password_special: '',
        password_digits: '',
    })
    function containsUppercase(str) {
        return /[A-Z]/.test(str);
    }

    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    function containsNumbers(str) {
        return /\d/.test(str);
    }

    const handlePasswordChange = (evnt) => {
        evnt.preventDefault();
        if (evnt.target.name === 'password') {
            setPasswordInput(evnt.target.value);
        } else {
            setRePasswordInput(evnt.target.value)
        }

        setValues(state => ({
            ...state,
            [evnt.target.name]: evnt.target.value
        }))
    }

    const togglePassword = (e) => {
        if (e.target.parentElement.parentElement.children[0].name === 'password') {
            if (shownPassword === 'password') {

                setShownPassword('text')

            } else {
                setShownPassword('password')
            }
        } else {

            if (shownRePassword === 'password') {
                setShownRePassword('text')

            } else {
                setShownRePassword('password')
            }
        }

    };

    const onChangeHandler = (e) => {
        e.preventDefault();
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const validationHandler = (e) => {
        e.preventDefault();
        // const data = Object.fromEntries(new FormData(e.target))
        // console.log(data.username)
        console.log(e.target)

        // if (values.checkbox !== 'on') {
        //     setError({
        //         [e.target.name]: values[e.target.name]
        //     })
        UserService.getUsers()
            .then(res => {
                let currentUser = res.find(x => x.username === e.target.value)
                let currentEmail = res.find(x => x.email === e.target.value)
                if (e.target.name === 'username') {
                    if (e.target.value.length < 2) {
                        setError({
                            [e.target.name]: values[e.target.name]
                        })
                    } else if (currentUser) {
                        setError({
                            exists: values[e.target.name]
                        })
                    } else {
                        setError({})
                    }
                } else if (e.target.name === 'email') {
                    if (!validateEmail(e.target.value)) {
                        setError({
                            email: values[e.target.name]
                        })
                    } else if (currentEmail) {
                        setError({
                            emailExists: values[e.target.name]
                        })
                    } else {
                        setError({})
                    }
                } else if (e.target.name === 'first_name') {
                    if (e.target.value.length < 2) {
                        setError({
                            first_name: values[e.target.name]
                        })
                    }
                } else if (e.target.name === 'last_name') {
                    if (e.target.value.length < 2) {
                        setError({
                            last_name: values[e.target.name]
                        })
                    }
                } else if (e.target.name === 'password') {
                    if (e.target.value.length < 8) {
                        setError({
                            password_characters: values[e.target.name]
                        })
                    } else if (!containsUppercase(e.target.value)) {
                        setError({
                            password_upper: values[e.target.name]
                        })
                    } else if (!containsSpecialChars(e.target.value)){
                        setError({
                            password_special: values[e.target.name]
                        })

                    }else if (!containsNumbers(e.target.value)){
                        setError({
                            password_digits: values[e.target.name]
                        })
                    }else {
                        setError({})
                    }
                } else {
                    setError({})
                }
            })




    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target))
        if (data.checkbox) {
            setError({})
        } else {
            setError({
                checkbox: 'checkbox'
            })
            return;
        }

        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')
        const username = formData.get('username')
        const first_name = formData.get('first_name')
        const last_name = formData.get('last_name')
        const password2 = formData.get('re_password')


        AuthService.register(username, email, first_name, last_name, password, password2)
            .then(res => {
                userLogin(res)
                navigate('/')
            })

            .catch((error) => {
                console.log('some error')
                console.log(error)
                navigate('/')
            })
    }

    return (
        <article className='daycare-registration-image'>
            <section className="daycare-registration">
                <article className="form-title"><h1>CREATE ACCOUNT</h1></article>
                <article className="daycare-form">
                    <form className='form' action="POST" onSubmit={onSubmitForm} >
                        <div className="user-details">
                            <input type="text" name="username" placeholder="Username" onChange={onChangeHandler} values={values.username} onBlur={(e) => validationHandler(e)} ></input>
                            {errors.username && <p>The username must be longer than 2 characters</p>}
                            {errors.exists && <p>Username already exists!</p>}
                        </div>

                        <div className="user-details">
                            <input type="text" name="email" placeholder="Email" onChange={onChangeHandler} values={values.email} onBlur={(e) => validationHandler(e)}></input>
                            {errors.email && <p>The email is invalid.</p>}
                            {errors.emailExists && <p>The email already exists!</p>}
                        </div>
                        <div className="user-details">
                            <input type="text" name="first_name" placeholder="First Name" onChange={onChangeHandler} values={values.first_name} onBlur={(e) => validationHandler(e)}></input>
                            {errors.first_name && <p>The name should be at least 2 characters long.</p>}
                        </div>
                        <div className="user-details">
                            <input type="text" name="last_name" placeholder="Last Name" onChange={onChangeHandler} values={values.last_name} onBlur={(e) => validationHandler(e)}></input>
                            {errors.last_name && <p>The name should be at least 2 characters long.</p>}
                        </div>
                        <div className="user-details">
                            <input type={shownPassword} onChange={handlePasswordChange} value={passwordInput} name="password" placeholder="Password" values={[values.password_characters, values.password_upper, values.password_special, values.password_digits]} onInput={(e) => validationHandler(e)}></input>

                            <div className='showspass-1'>
                                {shownPassword === 'password' ? <i className="fa-solid fa-eye" onClick={togglePassword}></i> : <i className="fa-regular fa-eye-slash" onClick={togglePassword}></i>}
                            </div>
                            <div className='password-checks'>
                                <ul className='password-checkers-1'>
                                    <li>The password must be at least 8 characters long {errors.password_characters ? <i className="fa-light fa-x" style={{ color: 'red' }}></i> : <i className="fa-solid fa-check" style={{ color: 'green' }}></i>}</li>
                                    <li>There must be at least one upper later {errors.password_upper ? <i className="fa-light fa-x" style={{ color: 'red' }}></i> : <i className="fa-solid fa-check" style={{ color: 'green' }}></i>}</li>
                                </ul>
                                <ul className='password-checkers-2'>
                                    <li>There must at least one special sign {errors.password_special ? <i className="fa-light fa-x" style={{ color: 'red' }}></i> : <i className="fa-solid fa-check" style={{ color: 'green' }}></i>}</li>
                                    <li>There must be at least one digit {errors.password_digits ? <i className="fa-light fa-x" style={{ color: 'red' }}></i> : <i className="fa-solid fa-check" style={{ color: 'green' }}></i>}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="user-details">

                            <input type={shownRePassword} onChange={handlePasswordChange} value={rePasswordInput} name="re_password" placeholder="Confirm Password" ></input>
                            <div className='showspass-2'>
                                {shownRePassword === 'password' ? <i className="fa-solid fa-eye" onClick={togglePassword}></i> : <i className="fa-regular fa-eye-slash" onClick={togglePassword}></i>}
                            </div>



                        </div>
                        <div className="confirm-form">
                            <input type="checkbox" name="checkbox" />
                            <p>I agree with T&C</p>
                        </div>
                        {errors.checkbox &&
                            <p className="form-error" style={{ color: 'red' }}>
                                You must agree with T&C!
                                {console.log(values)}
                            </p>
                        }
                        <div className="form-button">
                            <input type="submit" value="SIGN UP" />
                        </div>
                        <h3 className='account-h3'>Have already an account? <Link to='/login'>Login here</Link></h3>
                    </form>

                </article>

            </section>
        </article>
    )
}