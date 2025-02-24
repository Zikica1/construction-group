import './serviceCard.css';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { FaChevronRight } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
  return (
    <motion.li
      className='service-card'
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'tween', duration: 0.8 }}
    >
      <div className='service-img'>
        <img loading='lazy' src={service.img} alt={service.title} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.text}</p>

      <button>
        <FaChevronRight />
      </button>
    </motion.li>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object,
};

export default ServiceCard;
