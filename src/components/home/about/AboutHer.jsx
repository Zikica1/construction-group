import './aboutHer.css';
import Heading from '../../header/Heading';
import CountUp from 'react-countup';
import { motion, useInView, useAnimate } from 'motion/react';
import { useRef, useEffect } from 'react';

const AboutHer = () => {
  const ref = useRef(null);
  const [scopeContent, animateContent] = useAnimate();

  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const isInView2 = useInView(scopeContent, {
    once: true,
    amount: 0.5,
  });

  useEffect(() => {
    if (isInView2) {
      const handleAnimate = async () => {
        await animateContent(
          '.about-header',
          { opacity: 1, y: 0 },
          { duration: 0.75 }
        );
        await animateContent(
          '.about-par-1',
          { opacity: 1, y: 0 },
          { duration: 0.75 }
        );
        await animateContent(
          '.about-par-2',
          { opacity: 1, y: 0 },
          { duration: 0.75 }
        );
      };

      handleAnimate();
    }
  }, [isInView2, animateContent]);

  return (
    <section className='about-her'>
      <div className='about-her-wrap'>
        <div className='about-her-img'>
          <div className='about-img-1'>
            <img
              src='/pictures/aboutHer/info-img-1.webp'
              alt='building pictures'
            />
          </div>
          <div className='about-img-2'>
            <img src='/pictures/aboutHer/worker.jpg' alt='worker-img' />
          </div>
        </div>

        <div className='about-her-content'>
          <div ref={scopeContent}>
            <motion.div
              className='about-header'
              initial={{ opacity: 0, y: 25 }}
            >
              <Heading
                title='we are the leader'
                title2='in construction'
                subtitle='about company'
                isRow={true}
              />
            </motion.div>

            <motion.p className='about-par-1' initial={{ opacity: 0, y: 25 }}>
              Our expertise in construction spans decades, delivering innovative
              solutions and unmatched quality. We build with precision and
              integrity.
            </motion.p>

            <motion.p className='about-par-2' initial={{ opacity: 0, y: 25 }}>
              With years of experience, we specialize in delivering exceptional
              construction projects. From innovative designs to precise
              execution, our commitment to quality ensures every project meets
              the highest standards and exceeds client expectations.
            </motion.p>
          </div>

          <motion.ul
            ref={ref}
            className='statistics-wrap'
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'tween', duration: 0.75 }}
          >
            <li className='item'>
              <h3>
                {isInView ? (
                  <CountUp start={1} end={53} duration={2.8}></CountUp>
                ) : (
                  0
                )}
                K
              </h3>
              <p>Layout Done</p>
            </li>
            <li className='item'>
              <h3>
                {isInView ? (
                  <CountUp start={1} end={9} duration={2.8}></CountUp>
                ) : (
                  0
                )}
                K
              </h3>
              <p>Project Done</p>
            </li>
            <li className='item'>
              <h3>
                {isInView ? (
                  <CountUp start={50} end={120} duration={2.8}></CountUp>
                ) : (
                  0
                )}
              </h3>
              <p>Get Award</p>
            </li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default AboutHer;
