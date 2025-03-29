import PropTypes from 'prop-types';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const variantList = {
  initial: { opacity: 0, x: 40 },
  animate: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.8,
      delay: index * 0.1,
    },
  }),
};

const TeamList = ({ item, index }) => {
  const refList = useRef(null);
  const isInView = useInView(refList, {
    once: true,
    amount: 0.5,
  });

  return (
    <motion.li
      ref={refList}
      variants={variantList}
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      custom={index}
    >
      <div className='team-list-img'>
        <img src={item.imgUrl} alt={item.name} loading='lazy' />
      </div>

      <div className='team-list-des'>
        <h3>{item.title}</h3>
        <h4>{item.name}</h4>

        <ul className='team-list-icons'>
          {item.icons.map((icon, i) => (
            <li key={i}>
              <span>{icon}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
};

TeamList.propTypes = {
  item: PropTypes.object,
  index: PropTypes.string,
};

export default TeamList;
