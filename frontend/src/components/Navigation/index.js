// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='navBar'>
            <li className='homeBtn'>
                <NavLink exact to="/">
                    <img className='logoPic' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png' alt='airbnblogo'></img>
                </NavLink>
            </li>

            {isLoaded && (
                <li>
                    <div className="nav-links-container">
                        <div className="create-spot-link">
                            {sessionUser && (<NavLink to='/spots/new'>Airbnb your home</NavLink>)}
                        </div>
                        <div>
                            <ProfileButton user={sessionUser} />
                        </div>
                    </div>
                </li>
            )}


        </ul>
    );
}

export default Navigation;