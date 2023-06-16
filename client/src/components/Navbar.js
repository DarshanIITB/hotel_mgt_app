import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    function logOut(){
        localStorage.removeItem('currentUser');
        window.location.href='login';
    }
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand ml-3" href="#">VIVANTA by Taj</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><i className="fa fa-bars" aria-hidden="true" style={{color: "white"}}></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-5">
                    {user ? (<>
                        <div class="dropdown">
                            <button className="btn btn-secondary dropdown-toggle"
                            type="button" 
                            id="dropdownMenuButton" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                                {/* <i className="fa-solid fa-user"></i> */}{user.name}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Bookings</a>
                                <a className="dropdown-item" href="#" onClick={logOut}>Logout</a>
                            </div>
                        </div>
                    </>) :
                        (<>
                            <li className="nav-item active">
                                <Link to="/register">
                                    <a className="nav-link">Register</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login">
                                    <a className="nav-link">Login</a>
                                </Link>
                            </li>
                        </>)
                    }
                </ul>
            </div>
        </nav>
    )
}