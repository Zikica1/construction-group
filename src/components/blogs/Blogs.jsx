import './blogs.css';
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimate, useInView } from 'motion/react';
import { flushSync } from 'react-dom';
import { useLocation } from 'react-router-dom';
import BlogCard from './BlogCard';
import { blogs } from '../data/db';
import Heading from '../header/Heading';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';

const Blogs = () => {
  const [index, setIndex] = useState(0);
  const [columns, setColumns] = useState(0);
  const refCard = useRef(null);
  const [scopeHeading, animateHeading] = useAnimate();
  const isInView = useInView(scopeHeading, {
    once: true,
    amount: 1,
  });

  useEffect(() => {
    if (isInView) {
      const handleAniHeader = async () => {
        await animateHeading(
          '.heading-ani',
          { opacity: 1, x: 0 },
          { duration: 0.8 }
        );
        await animateHeading(
          '.blogs-buttons-wrap',
          { opacity: 1 },
          { duration: 0.8 }
        );
      };

      handleAniHeader();
    }
  }, [isInView, animateHeading]);

  const location = useLocation();

  const isHome = location.pathname === '/';

  const blogsContent = isHome ? blogs.slice(0, 5) : blogs;

  const updateColumns = () => {
    if (window.innerWidth >= 1040) {
      setColumns(4);
    } else {
      setColumns(1);
    }
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);

    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const handleNext = () => {
    flushSync(() => {
      if (index < blogsContent.length - 1) {
        setIndex(index + columns);
      } else {
        setIndex(0);
      }
    });

    refCard.current.scrollIntoView({
      behavior: 'smooth',
      // block: 'center',
      inline: 'start',
    });
  };

  const handlePrev = () => {
    flushSync(() => {
      if (index === 0) {
        setIndex(blogsContent.length - 1);
      } else {
        setIndex(index - columns);
      }
    });

    refCard.current.scrollIntoView({
      behavior: 'smooth',
      // block: 'center',
      inline: 'start',
    });
  };

  return (
    <section className={`blogs ${isHome && 'blogs-home'}`}>
      {isHome && (
        <div
          className='blogs-header'
          ref={scopeHeading}
          style={{ overflowX: 'clip' }}
        >
          <motion.div className='heading-ani' initial={{ opacity: 0, x: 50 }}>
            <Heading title='recent news' subtitle="what's up" />
          </motion.div>

          <motion.div className='blogs-buttons-wrap' initial={{ opacity: 0 }}>
            <button onClick={handlePrev} className='blog-button'>
              <MdKeyboardDoubleArrowLeft />
            </button>
            <button onClick={handleNext} className='blog-button'>
              <MdKeyboardDoubleArrowRight />
            </button>
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
        className={`blogs-wrap ${isHome ? 'flex' : 'grid'}`}
      >
        {blogsContent.map((blog) => (
          <BlogCard key={blog.id} blog={blog} index={index} ref={refCard} />
        ))}
      </motion.div>
    </section>
  );
};

export default Blogs;
