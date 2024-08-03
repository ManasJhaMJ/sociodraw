// import logo from '../assets/logo.png'
// import github from '../assets/github.png'
// import invite from '../assets/invite.png'
// import { Link, NavLink } from 'react-router-dom'
// import { RWebShare } from "react-web-share";

// function Navbar() {
//     return (
//         <nav>
//             <div className='logo'>
//                 <Link to="/" ><img src={logo} alt="logo" /></Link>
//                 <Link to="/">
//                     <h1>SocioDraw</h1>
//                 </Link>
//             </div>
//             <ul>
//                 <li>
//                     <NavLink to="/">Home</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/draw">Draw</NavLink>
//                 </li>
//                 <li>
//                     <RWebShare
//                         data={{
//                             text: "Share Sociodraw with your friends!",
//                             url: "https://sociodraw.vercel.app/",
//                             title: "Sociodraw",
//                         }}
//                         onClick={() =>
//                             console.log("shared successfully!")
//                         }
//                     >
//                         <button>
//                             <img src={invite} alt="invite friends" />
//                             <p>Invite</p>
//                         </button>
//                     </RWebShare>
//                 </li>
//                 <li>
//                     <a href="https://github.com/ManasJhaMJ/sociodraw"><button>
//                         <img src={github} alt="Star" />
//                         <p>Star</p>
//                     </button></a>
//                 </li>
//             </ul>
//         </nav>
//     )
// }

// export default Navbar

import React, { useState } from 'react';
import logo from '../assets/logo.png';
import github from '../assets/github.png';
import invite from '../assets/invite.png';
import { Link, NavLink } from 'react-router-dom';
import { RWebShare } from "react-web-share";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav>
            <div className='logo'>
                <Link to="/" ><img src={logo} alt="logo" /></Link>
                <Link to="/">
                    <h1>SocioDraw</h1>
                </Link>
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul className={menuOpen ? 'show' : ''}>
                <li>
                    <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/draw" onClick={() => setMenuOpen(false)}>Draw</NavLink>
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
                            setMenuOpen(false);
                        }}
                    >
                        <button>
                            <img src={invite} alt="invite friends" />
                            <p>Invite</p>
                        </button>
                    </RWebShare>
                </li>
                <li>
                    <a
                        href="https://github.com/ManasJhaMJ/sociodraw"
                        onClick={() => setMenuOpen(false)}
                        rel="noreferrer"
                        target='_blank'
                    >
                        <button>
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
