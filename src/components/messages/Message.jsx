import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Message = ({ message }) => {
  return (
    <li className='message'>
      <Link className='message-link' to={message._id}>
        <h3>{message.subject}</h3>
        <p className='message-date'>{message.createdAt}</p>
      </Link>
      <p className='message-body'>
        {message.text.length <= 25
          ? message.text
          : `${message.text.slice(0, 25)}...`}
      </p>
    </li>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
