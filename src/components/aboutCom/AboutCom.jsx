import './aboutCom.css';
import { useEffect } from 'react';
import { motion, useAnimate, useInView } from 'motion/react';
import { about } from '../data/db';
import { FaCheck } from 'react-icons/fa';

const AboutCom = () => {
  const [detailScope, detailAnimate] = useAnimate();

  const isInView = useInView(detailScope, {
    once: true,
    amount: 0.2,
  });

  useEffect(() => {
    if (isInView) {
      const handleAnimate = () => {
        detailAnimate(
          '.animate',
          { y: 0, opacity: 1 },
          { type: 'tween', duration: 0.8 }
        );
        detailAnimate(
          '.animate-2',
          { y: 0, opacity: 1 },
          { type: 'tween', duration: 0.8 }
        );
      };
      handleAnimate();
    }
  }, [isInView, detailAnimate]);

  return (
    <section className='about-company'>
      <div className='about-company-wrap'>
        <div className='company-img-wrap'>
          <div className='company-img-1'>
            <motion.img
              src='/pictures/aboutCom/aboutCom-img-1.jpg'
              alt='about-img'
              whileInView={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              }}
              viewport={{ once: true, amount: '0.5' }}
              transition={{ type: 'tween', duration: 1.5 }}
            />
          </div>
          <div className='company-img-2'>
            <motion.img
              src='/pictures/aboutCom/aboutCom-img-2.jpg'
              alt='about-img'
              whileInView={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              }}
              viewport={{ once: true, amount: '0.5' }}
              transition={{ type: 'tween', duration: 1.5 }}
            />
          </div>
        </div>

        <div ref={detailScope} className='company-detail'>
          <motion.h2 className='animate' initial={{ opacity: 0, y: 50 }}>
            <span>About Constructions Group</span>
            Innovative buildings with new materials
          </motion.h2>

          <motion.p className='animate-2' initial={{ opacity: 0, y: 50 }}>
            Our company is at the forefront of innovative construction,
            combining advanced techniques with cutting-edge materials to
            redefine modern architecture. Sustainability drives every project.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ type: 'tween', duration: 1.2 }}
          >
            We deliver exceptional buildings that prioritize functionality,
            aesthetics, and environmental impact, creating spaces that inspire
            and endure for future generations.
          </motion.p>

          <motion.ul
            className='company-det-list'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ type: 'tween', duration: 1.2 }}
          >
            {about.map((a, i) => (
              <li key={i}>
                <FaCheck />
                {a}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default AboutCom;
