import { useState } from "react";
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    const [tab, setTab] = useState('homepage'); // Default tab can be 'homepage'

    const handleClick = (newTab) => {
        if (tab !== newTab) {
            setTab(newTab); // Update tab only if it's different from the current one
        }
    };

    return ( 
        <div className="navbar-container">
            <Link to='/homepage'>
                <button 
                    className={'btn ' + (tab === 'homepage' ? 'btn-primary' : 'btn-outline-primary')}
                    onClick={() => handleClick('homepage')}
                >
                    Home
                </button>
            </Link>

            <Link to='/menu'>
                <button 
                    className={'btn ' + (tab === 'menu' ? 'btn-primary' : 'btn-outline-primary')}
                    onClick={() => handleClick('menu')}
                >
                    Menu
                </button>
            </Link>

            <Link to='/home/call'>
                <button 
                    className={'btn ' + (tab === 'call' ? 'btn-primary' : 'btn-outline-primary')}
                    onClick={() => handleClick('call')}
                >
                    Noti
                </button>
            </Link>

            <Link to='/created_position'>
                <button 
                    className={'btn ' + (tab === 'created_position' ? 'btn-primary' : 'btn-outline-primary')}
                    onClick={() => handleClick('created_position')}
                >
                    User
                </button>
            </Link>
        </div>
    );
}

export default Navbar;
