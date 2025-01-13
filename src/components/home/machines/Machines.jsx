import './machines.css';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Heading from '../../header/Heading';
import ButtonVideo from '../../buttons/ButtonVideo';

const fadeInVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
};
const fadeInVariant2 = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
};

const Machines = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.8,
  });
  const isInView2 = useInView(ref2, {
    once: true,
    amount: 1,
  });

  return (
    <section className='machines'>
      <motion.div
        ref={ref}
        className='machines-ani-1'
        variants={fadeInVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Heading title='heavy duty machines' subtitle='we have' />
        <p>
          Our advanced heavy-duty machines ensure top-quality performance,
          efficiency, and reliability for all construction needs.
        </p>
      </motion.div>

      <motion.div
        ref={ref2}
        className='button-ani'
        variants={fadeInVariant2}
        initial='hidden'
        animate={isInView2 ? 'visible' : 'hidden'}
      >
        <ButtonVideo />
      </motion.div>
    </section>
  );
};

export default Machines;
