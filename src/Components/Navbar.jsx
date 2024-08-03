import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RWebShare } from "react-web-share";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import github from '../assets/github.png';
import invite from '../assets/invite.png';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav>
            <div className='logo'>
                <Link to="/" ><img src={logo} alt="logo" /></Link>
                <Link to="/">
                    <h1>SocioDraw</h1>
                </Link>
            </div>
            <div className="burger" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
            </div>
            <ul className={isOpen ? "show" : ""}>
                <li>
                    <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/draw" onClick={toggleMenu}>Draw</NavLink>
                </li>
                <li>
                    <RWebShare
                        data={{
                            text: "Share Sociodraw with your friends!",
                            url: "https://sociodraw.vercel.app/",
                            title: "Sociodraw",
                        }}
                        onClick={() => {
                            console.log("shared successfully!");
                            toggleMenu();
                        }}
                    >
                        <button>
                            <img src={invite} alt="invite friends" />
                            <p>Invite</p>
                        </button>
                    </RWebShare>
                </li>
                <li>
                    <a href="https://github.com/ManasJhaMJ/sociodraw">
                        <button onClick={toggleMenu}>
                            <img src={github} alt="Star" />
                            <p>Star</p>
                        </button>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
