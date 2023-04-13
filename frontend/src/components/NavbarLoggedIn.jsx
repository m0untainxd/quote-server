import React from 'react'
import { NavLink } from 'react-router-dom'

function NavbarLoggedIn() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light border-bottom shadow">
                <div class="container-fluid">
                    <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="/">Quote Site</NavLink>
                    <a class="navbar-toggler" type="NavLink" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <NavLink to="/login" className="btn btn-outline-primary ms-auto px-4 rounded-pill">
                        <i className="fa fa-sign-in me-2"></i> Login</NavLink>
                    <NavLink to="/register" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                        <i className="fa fa-user-plus me-2"></i> Register</NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavbarLoggedIn
