import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar';

export default function Register() {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const signup = (e) => {
        e.preventDefault();
        console.log("Signing up")
        let data = {"name": values.name, "email": values.email, "password": values.password}
        var requestURI = "http://localhost:8000/api/users"
        console.log(requestURI)
        axios.post(requestURI, data)
        .then(response => {
            if (response.status === 400 || !response) {
                window.alert("Invalid credentials entered")
            } else {
                window.alert("Signed up successfully!")
                navigate('/login')
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container shadow my-5">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column align-items-center form justify-content-center">
                        <h1 className="display-4">Hello</h1>
                        <p className="lead">Enter your details to register</p>
                        <h5 className='mb-4'>OR</h5>
                        <NavLink to="/login" className="btn btn-outline-primary ms-2 px-4 rounded-pill">Login</NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <form>
                            <div className="mb-3">
                                <label for="name" className="form-label">Name</label>
                                <input type="name" className="form-control" id="name" name="name" onChange={handleChange('name')}/>
                            </div>
                            <div className="mb-3">
                                <label for="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" onChange={handleChange('email')} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label for="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" onChange={handleChange('password')}/>
                            </div>
                            <div className="text-center">
                                <button type="submit" onClick={signup} className="btn btn-outline-primary w-50 mt-4">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}