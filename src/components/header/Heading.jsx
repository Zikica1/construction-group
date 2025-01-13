import './heading.css';
import PropTypes from 'prop-types';

const Heading = ({ title, title2, subtitle, isRow = false }) => {
  return (
    <div>
      <h2
        style={{ flexDirection: isRow ? 'row' : 'column' }}
        className='subtitle'
      >
        {subtitle}
      </h2>
      <h3 className='title'>
        {title}
        <br />
        <span>{title2}</span>
      </h3>
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
  title2: PropTypes.string,
  subtitle: PropTypes.string,
  isRow: PropTypes.bool,
};

export default Heading;
