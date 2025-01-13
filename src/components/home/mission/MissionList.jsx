import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import PropTypes from 'prop-types';

const missionAni = [
  {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { type: 'tween', duration: 1, ease: 'easeInOut' },
  },
  {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { type: 'tween', duration: 1, ease: 'easeInOut' },
  },
  {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { type: 'tween', duration: 1, ease: 'easeInOut' },
  },
  {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { type: 'tween', duration: 1, ease: 'easeInOut' },
  },
];

const MissionList = ({ item, index }) => {
  const refList = useRef(null);
  const isInView = useInView(refList, {
    once: true,
    amount: 0.7,
  });

  return (
    <motion.li
      ref={refList}
      initial={missionAni[index % missionAni.length].initial}
      animate={
        isInView
          ? missionAni[index % missionAni.length].animate
          : missionAni[index % missionAni.length].initial
      }
      transition={missionAni[index % missionAni.length].animate}
    >
      <div className='list-img'>
        <img src={item.imgUrl} alt='' />
      </div>

      <div className='list-detail'>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </motion.li>
  );
};

MissionList.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

export default MissionList;
