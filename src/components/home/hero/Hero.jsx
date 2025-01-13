import './hero.css';
import Button from '../../buttons/Button';
import { useEffect } from 'react';
import { useAnimate, motion } from 'motion/react';

const Hero = () => {
  const [heroScope, heroAnimate] = useAnimate();

  useEffect(() => {
    const handleAnimate = () => {
      heroAnimate(
        '.hero-img',
        { x: 0, opacity: 1 },
        { type: 'tween', duration: 1.9 }
      );
      heroAnimate(
        '.hero-content-details',
        { y: 0 },
        { type: 'tween', duration: 1.2, delay: 0.8 }
      );
      heroAnimate(
        '.button-ani',
        { x: 0, opacity: 1 },
        { type: 'tween', duration: 0.8, delay: 2 }
      );
    };

    handleAnimate();
  }, [heroAnimate]);

  return (
    <section className='hero'>
      <div ref={heroScope} className='hero-wrapper'>
        <div className='hero-content-wrap'>
          <div className='hero-content'>
            <motion.div className='hero-content-details' initial={{ y: 330 }}>
              <h1>Innovation</h1>
              <h3>
                {' '}
                <span>Construction</span>
              </h3>
              <p>
                Delivering excellence through innovative construction solutions.
                Building dreams with precision, quality, and expertise to create
                lasting structures that stand the test of time.
              </p>
            </motion.div>
          </div>
          <motion.div className='button-ani' initial={{ x: -40, opacity: 0 }}>
            <Button title='Read More' />
          </motion.div>
        </div>

        <motion.div className='hero-img' initial={{ x: 100, opacity: 0 }}>
          <img src='/pictures/home/construction-worker-hero.png' alt='' />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
