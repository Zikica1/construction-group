import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({ title, url }) => {
  const location = useLocation();
  const linkUrl = url || location.pathname;

  return (
    <Link to={`${linkUrl}`} className='button'>
      <span className='text'>{title}</span>
      <span className='overlay'></span>
    </Link>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

export default Button;
