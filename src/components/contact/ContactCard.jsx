import './contactCard.css';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import PropTypes from 'prop-types';

const variantInformation = {
  hidden: { opacity: 0, x: 50 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.8,
      delay: 0.2 * index,
    },
  }),
};

const ContactCard = ({ item }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const Icon = item.Icon;

  return (
    <motion.li
      ref={ref}
      className='contact-card'
      variants={variantInformation}
      custom={item.id}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
    >
      <h4>{item.title}</h4>
      <p>
        {item.text} <span>{item.subtext}</span>
      </p>
      <Icon className='contact-icon' />
    </motion.li>
  );
};

ContactCard.propTypes = {
  item: PropTypes.object,
};

export default ContactCard;
