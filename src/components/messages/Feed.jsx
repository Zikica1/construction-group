import Message from './Message';
import PropTypes from 'prop-types';

const Feed = ({ messages }) => {
  return (
    <ul className='messages-list'>
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </ul>
  );
};

Feed.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default Feed;
