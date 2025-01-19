import './aboutClients.css';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { aboutClients } from '../data/db';
import AboutCard from './AboutCard';

const variantDetail = {
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

const AboutClients = () => {
  const refDetail = useRef(null);

  const isInView = useInView(refDetail, {
    amount: 1,
    once: true,
  });

  return (
    <section className='about-clients'>
      <div className='about-clients-wrap'>
        <motion.div
          ref={refDetail}
          className='about-clients-detail'
          variants={variantDetail}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2>
            <span>Our Clients</span>
            Happy Customers Trust Us
          </h2>
          <p>
            We take pride in building lasting relationships with our clients,
            delivering exceptional service, and ensuring their satisfaction on
            every project.
          </p>
        </motion.div>
        <div className='about-clients-brands'>
          <ul className='about-brands-wrap'>
            {aboutClients.map((client) => (
              <AboutCard key={client.id} client={client} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutClients;
