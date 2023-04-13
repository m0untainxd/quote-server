import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar';

export default function Login() {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: '',
        password: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const signin = (e) => {
        e.preventDefault();
        console.log("Signing in")
        console.log(values.email)
        console.log(values.password)
        let data = {"email": values.email, "password": values.password}
        var requestURI = "http://localhost:8000/auth/signin"
        console.log(requestURI)
        axios.post(requestURI, data)
        .then(response => {
            if (response.status === 400 || !response) {
                window.alert("Email or password do not match")
            } else {
                console.log("Setting JWT in storage")
                sessionStorage.setItem('auth', JSON.stringify(response.data))
                window.alert("Signed in successfully!")
                navigate('/')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container shadow my-5">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column align-items-center form justify-content-center">
                        <h1 className="display-4">Welcome Back</h1>
                        <p className="lead">Enter your credentials</p>
                        <h5 className='mb-4'>OR</h5>
                        <NavLink to="/register" className="btn btn-outline-primary ms-2 px-4 rounded-pill">Register</NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <form>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="email" name="email" onChange={handleChange('email')} aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password" onChange={handleChange('password')} />
                            </div>
                            <div className="text-center">
                                <button type="submit" onClick={signin} class="btn btn-outline-primary w-50 mt-4">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
