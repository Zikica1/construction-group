import './team.css';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Heading from '../../header/Heading';
import { team } from '../../data/db';
import TeamList from './TeamList';

const headingVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
};

const Team = () => {
  const refHeading = useRef(null);
  const isInView = useInView(refHeading, {
    once: true,
    amount: 0.8,
  });

  return (
    <section className='team'>
      <motion.div
        ref={refHeading}
        variants={headingVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Heading
          title='meet with company'
          title2=' team member'
          subtitle='our team'
        />
      </motion.div>

      <ul className='team-cards-wrap grid'>
        {team.map((t) => (
          <TeamList key={t.id} item={t} index={t.id} />
        ))}
      </ul>
    </section>
  );
};

export default Team;
