import './portfolio.css';
import { useRef, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import Heading from '../header/Heading';
import { projects } from '../../components/data/db';
import PortfolioCard from './PortfolioCard';

const variantPortHeading = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.8,
    },
  },
};

const variantPortButton = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.8,
    },
  },
};

const variantPortCards = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'tween',
      duration: 0.8,
    },
  },
};

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const refHeading = useRef(null);
  const refButtons = useRef(null);
  const refCards = useRef(null);
  const [activeCardId, setActiveCardId] = useState(null);

  const isInView = useInView(refHeading, {
    once: true,
    amount: 0.8,
  });

  const isInViewButton = useInView(refButtons, {
    once: true,
    amount: 0.8,
  });

  const isInViewCards = useInView(refCards, {
    once: true,
    amount: 0.15,
  });

  const location = useLocation();

  const isHome = location.pathname === '/';

  const filterType = searchParams.get('type')?.toLowerCase() || '';

  const filterContent = filterType
    ? projects.filter((project) => project.type.toLowerCase() === filterType)
    : projects;

  const projectContent = isHome ? filterContent.slice(0, 5) : filterContent;

  return (
    <section className='portfolio'>
      <div className='port-nav-wrap'>
        <motion.div
          ref={refHeading}
          variants={variantPortHeading}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Heading title='Case Solution' subtitle='portfolio' isRow={true} />
        </motion.div>

        <motion.div
          ref={refButtons}
          className='port-buttons-wrap'
          variants={variantPortButton}
          initial='hidden'
          animate={isInViewButton ? 'visible' : 'hidden'}
        >
          {filterType && (
            <button
              className='port-button'
              onClick={() => {
                setSearchParams({ type: '' });
              }}
            >
              All
            </button>
          )}

          <button
            className={`port-button ${
              filterType === 'construction' ? 'selected' : ''
            }`}
            onClick={() => {
              setSearchParams({ type: 'construction' });
            }}
          >
            Construction
          </button>
          <button
            className={`port-button ${
              filterType === 'garden' ? 'selected' : ''
            }`}
            onClick={() => {
              setSearchParams({ type: 'garden' });
            }}
          >
            Garden
          </button>
          <button
            className={`port-button ${
              filterType === 'house' ? 'selected' : ''
            }`}
            onClick={() => {
              setSearchParams({ type: 'house' });
            }}
          >
            House
          </button>
          <button
            className={`port-button ${
              filterType === 'school' ? 'selected' : ''
            }`}
            onClick={() => {
              setSearchParams({ type: 'school' });
            }}
          >
            School
          </button>
        </motion.div>
      </div>

      <motion.div
        ref={refCards}
        className='port-cards-wrap main-grid'
        variants={variantPortCards}
        initial='hidden'
        animate={isInViewCards ? 'visible' : 'hidden'}
      >
        {projectContent.map((p) => (
          <PortfolioCard
            key={p.id}
            item={p}
            searchParams={searchParams}
            filterType={filterType}
            isActive={activeCardId === p.id}
            setActiveCardId={setActiveCardId}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Portfolio;
