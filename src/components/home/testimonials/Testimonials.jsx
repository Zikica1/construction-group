import './testimonials.css';
import { motion } from 'motion/react';
import { testimonials } from '../../data/db';
import Heading from '../../header/Heading';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  return (
    <section className='testimonials'>
      <motion.div
        className='testimonials-heading'
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8 }}
      >
        <Heading title="Client's Testimonial" subtitle='Customer Say' />
      </motion.div>

      <div className='testimonials-wrap'>
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={testimonial.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
