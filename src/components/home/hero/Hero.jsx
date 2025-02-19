import './hero.css';
import Button from '../../buttons/Button';
import { useEffect } from 'react';
import { useAnimate, motion } from 'motion/react';

const Hero = () => {
  const [heroScope, heroAnimate] = useAnimate();

  const backgroundStyle = {
    backgroundColor: 'rgba(0, 7, 42, 0.8)',
    backgroundImage: 'url(/pictures/home/hero-bg1.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'darken',
  };

  useEffect(() => {
    const handleAnimate = () => {
      heroAnimate(
        '.hero-img',
        { x: 0, opacity: 1 },
        { type: 'tween', duration: 1.2 }
      );
      heroAnimate(
        '.hero-content-details',
        { y: 0 },
        { type: 'tween', duration: 0.8 }
      );
      heroAnimate(
        '.button-ani',
        { x: 0, opacity: 1 },
        { type: 'tween', duration: 0.5 }
      );
    };

    handleAnimate();
  }, [heroAnimate]);

  return (
    <section className='hero' style={backgroundStyle}>
      <img
        src='/pictures/home/hero-bg1.webp'
        alt='Preload'
        style={{ display: 'none' }}
      />
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
          <picture>
            <source
              media='(max-width: 500px)'
              srcSet='/pictures/home/construction-worker-hero-411px.png'
            />
            <source
              media='(max-width: 600px)'
              srcSet='/pictures/home/construction-worker-hero-500px.png'
            />
            <source
              media='(max-width: 1366px)'
              srcSet='/pictures/home/construction-worker-hero-633px.png'
            />
            <img
              src='/pictures/home/construction-worker-hero-700px.png'
              alt='img-worker'
            />
          </picture>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
