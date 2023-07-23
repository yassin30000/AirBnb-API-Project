// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    console.log(sessionUser)
    if (sessionUser) {
        sessionLinks = (
            <li className='profileBtn'>
                <ProfileButton user={sessionUser} />
            </li>
        );
    } else {
        sessionLinks = (
            <li>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
        );
    }

    return (
        <ul className='navBar'>
            <li className='homeBtn'>
                <NavLink exact to="/">
                    {/* <img className='logoPic' src='https://ebenezersuites.com/wp-content/uploads/2016/06/airbnb-logo-266x300@2x.png' alt='airbnblogo'></img> */}
                    airbnb</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;