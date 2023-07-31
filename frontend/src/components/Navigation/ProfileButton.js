// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button className='profileBtn' onClick={openMenu} style={{ color: 'grey' }}>
                <i className="fas fa-user-circle"></i>
            </button>

            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>Hello, {user.firstName}</li>
                        <li>{user.email}</li>
                        <li className="manage-spots-link"> <NavLink to='/'>Manage Spots</NavLink></li>
                        <li className="logoutLI" onClick={logout}>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login">Log In</NavLink>
                            <NavLink to="/signup">Sign Up</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;