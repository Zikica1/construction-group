import './navigate.css';
import { NavLink, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Navigate = ({ isOpen }) => {
  const activeStyle = {
    color: 'rgb(255 219 3)',
  };

  return (
    <nav className={`nav ${isOpen ? 'show' : ''}`}>
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
  );
};

Navigate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Navigate;
