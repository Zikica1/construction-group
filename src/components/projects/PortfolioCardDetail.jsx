import './portfolioCardDetail.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { projectCardDetail } from '../data/db';
import Button from '../buttons/Button';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

const PortfolioCardDetail = () => {
  const { id } = useParams();
  const projectDetail = projectCardDetail.find((project) => project.id === id);
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isWindowScreen, setIsWindowScreen] = useState(
    window.innerWidth > 1060
  );

  useEffect(() => {
    const handleResize = () => {
      setIsWindowScreen(window.innerWidth > 1060);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsWindowScreen]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 1%', 'end 50%'],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ['5%', '80%']);

  const search = location.state?.search || '';
  const type = location.state?.type || 'all';

  const handleNext = () => {
    const currentIndex = projectCardDetail.findIndex(
      (project) => project.id === id
    );

    const nextIndex = (currentIndex + 1) % projectCardDetail.length;
    const nextId = projectCardDetail[nextIndex].id;

    navigate(`/projects/${nextId}`, {
      state: { search, type },
    });
  };

  const handlePrevious = () => {
    const currentIndex = projectCardDetail.findIndex(
      (project) => project.id === id
    );
    const prevIndex =
      (currentIndex - 1 + projectCardDetail.length) % projectCardDetail.length;
    const prevId = projectCardDetail[prevIndex].id;

    navigate(`/projects/${prevId}`, {
      state: { search, type },
    });
  };

  return (
    <section className='project-detail'>
      <Link to={`..${search}`} relative='path'>
        &larr; Go back to {type}
      </Link>
      <div className='project-detail-wrap'>
        <div className='project-detail-img'>
          <img
            srcSet={`${projectDetail.imgMob} 400w, ${projectDetail.img} 800w`}
            sizes='(max-width: 500px) 400px, (max-width: 768px) 800px, 100vw'
            src={projectDetail.img}
            alt={projectDetail.type}
          />
        </div>

        <div className='project-detail-text'>
          <motion.div
            ref={ref}
            style={{
              y: isWindowScreen ? translateY : 0,
              transition: 'all 0.5s ease',
            }}
          >
            <h1>{projectDetail.title}</h1>
            <p>{projectDetail.text}</p>
            <Button title='Launch Project' />
          </motion.div>
        </div>

        <div className='project-detail-slider'>
          <div className='left-arrow'>
            <button onClick={handlePrevious}>
              <MdKeyboardDoubleArrowLeft />
            </button>
            <span>Previous</span>
          </div>

          <div className='right-arrow'>
            <span>Next</span>
            <button onClick={handleNext}>
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCardDetail;
