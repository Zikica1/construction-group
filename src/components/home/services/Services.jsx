import './services.css';
import { motion } from 'motion/react';
import Heading from '../../header/Heading';
import { services } from '../../data/db';
import ServiceCard from './ServiceCard';

const Services = () => {
  return (
    <section className='services'>
      <motion.div
        className='ser-header-ani'
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5, once: true }}
        transition={{ type: 'tween', duration: 1 }}
      >
        <Heading
          title='Improve Your'
          title2='Experience With Us'
          subtitle='Our Services'
        />
      </motion.div>

      <ul className='serv-cards-wrap grid'>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ul>
    </section>
  );
};

export default Services;
