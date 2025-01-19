import PropTypes from 'prop-types';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const variantAboutCard = {
  hidden: { opacity: 0 },
  visible: (index) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: index * 0.1,
    },
  }),
};

const AboutCard = ({ client }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 1,
  });

  return (
    <motion.li
      ref={ref}
      className='about-card'
      variants={variantAboutCard}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      custom={client.id}
    >
      <img src={client.imgUrl} alt={client.imgUrl} />
    </motion.li>
  );
};

AboutCard.propTypes = {
  client: PropTypes.object,
};

export default AboutCard;
