import './aboutPrinciple.css';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const priVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
};

const AboutPrinciple = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.5,
    once: true,
  });

  return (
    <section className='about-pri'>
      <motion.div
        ref={ref}
        className='about-pri-wrap'
        variants={priVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <span className='about-quotation-marks'>,,</span>
        <p>
          Quality, trust, and dedication are the foundations on which we build
          every project, creating lasting value and advancing the future through
          innovation.
        </p>

        <h4>
          David Phillips <span>Ceo And Head of Idea</span>
        </h4>
      </motion.div>
    </section>
  );
};

export default AboutPrinciple;
