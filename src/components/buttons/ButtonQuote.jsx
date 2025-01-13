import './buttonQuote.css';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const ButtonQuote = ({ text, url }) => {
  const location = useLocation();
  const linkUrl = url || location.pathname;

  return (
    <Link to={`${linkUrl}`} className='button-quote'>
      {' '}
      <span className='text'>{text}</span>
      <span className='icon'>
        <MdKeyboardDoubleArrowRight />
      </span>
    </Link>
  );
};

ButtonQuote.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
};

export default ButtonQuote;
