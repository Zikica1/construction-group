import PropTypes from 'prop-types';

const ContactCard = ({ item }) => {
  const Icon = item.Icon;
  return (
    <li className='contact-card'>
      <h4>{item.title}</h4>
      <p>
        {item.text} <span>{item.subtext}</span>
      </p>
      <Icon className='contact-icon' />
    </li>
  );
};

ContactCard.propTypes = {
  item: PropTypes.object,
};

export default ContactCard;
