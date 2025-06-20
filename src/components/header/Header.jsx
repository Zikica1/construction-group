import './header.css';
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const activeStyle = {
    color: 'rgb(255 219 3)',
  };

  const handleClick = () => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <header className={`${isHome ? 'header-home' : 'header'} header-main`}>
      <Link to='/' className='logo'>
        <img src='/pictures/header/Logo-header.png' alt='logo' />
      </Link>

      <nav className={`${isOpen ? 'show' : ''} nav`}>
        <ul className='nav-list'>
          <li>
            <NavLink
              to='.'
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='about'
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to='projects'
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to='blog'
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to='contact'
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to='admin'
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Admin
            </NavLink>
          </li>
          <li>
            <Link to='register' title='login'>
              <FaUserCircle className='user-icon' />
            </Link>
          </li>
        </ul>
      </nav>

      <button
        onClick={handleClick}
        className={`${isOpen ? 'open' : ''} hamburger-menu`}
      >
        <span className='hamburger-top'></span>
        <span className='hamburger-middle'></span>
        <span className='hamburger-bottom'></span>
      </button>
    </header>
  );
};

export default Header;
