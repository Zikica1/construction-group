import PropTypes from 'prop-types';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const cardVariant = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.2 * index,
    },
  }),
};

const TestimonialCard = ({ testimonial, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.6,
  });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariant}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      className='testimonial'
    >
      <div className='testimonial-wrap'>
        <div className='testimonial-img'>
          <img src={testimonial.imgUrl} alt={testimonial.name} />
        </div>

        <div className='testimonial-rating'>
          <h4>{testimonial.name}</h4>
          <div className='icons'>
            {testimonial.icons.map((icon, i) => (
              <span key={i}>{icon}</span>
            ))}
          </div>
        </div>
      </div>

      <div className='testimonial-text'>
        <p>{testimonial.text}</p>
      </div>
      <svg
        width='11'
        height='9'
        viewBox='0 0 11 9'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_1817_2)'>
          <path
            d='M6.68 9C6.20313 7.78989 5.95886 6.50068 5.96 5.2C5.9033 3.88142 6.31412 2.58519 7.12 1.54C7.55796 1.04848 8.10342 0.664643 8.71394 0.418353C9.32446 0.172063 9.98358 0.0699636 10.64 0.12V1.96C10.3706 1.93767 10.0995 1.97244 9.8445 2.06205C9.58947 2.15165 9.35622 2.29407 9.16 2.48C8.7905 2.98839 8.61977 3.61441 8.68 4.24V4.6H11V9H6.68ZM0.76 9C0.283134 7.78989 0.0388611 6.50068 0.04 5.2C-0.0167042 3.88142 0.394124 2.58519 1.2 1.54C1.63796 1.04848 2.18342 0.664643 2.79394 0.418353C3.40446 0.172063 4.06358 0.0699636 4.72 0.12V1.96C4.45061 1.93767 4.17954 1.97244 3.9245 2.06205C3.66947 2.15165 3.43622 2.29407 3.24 2.48C2.8705 2.98839 2.69977 3.61441 2.76 4.24V4.6H5.08V9H0.76Z'
            fill='#081420'
          />
        </g>
        <defs>
          <clipPath id='clip0_1817_2'>
            <rect
              width='10.96'
              height='8.88'
              fill='white'
              transform='matrix(-1 0 0 -1 11 9)'
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.object,
  index: PropTypes.string,
};

export default TestimonialCard;
