import './mission.css';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { mission } from '../../data/db';
import MissionList from './MissionList';

const missionVariant = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.8,
    },
  },
};

const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.7,
  });

  return (
    <section className='mission'>
      <motion.header
        ref={ref}
        className='mission-header'
        variants={missionVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <h3>We Can Do It</h3>
        <h2>
          Improve Your <br />
          <span>Experience With Us</span>
        </h2>
      </motion.header>

      <div className='mission-wrapper'>
        <ul className='mission-list'>
          {mission.map((m, i) => (
            <MissionList key={m.id} item={m} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Mission;
