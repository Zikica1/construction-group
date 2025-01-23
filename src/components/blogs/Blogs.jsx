import './blogs.css';
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimate, useInView } from 'motion/react';
import { useLocation } from 'react-router-dom';
import BlogCard from './BlogCard';
import { blogs } from '../data/db';
import Heading from '../header/Heading';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';

const Blogs = () => {
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
    } else if (window.innerWidth >= 768) {
      setColumns(2);
    } else {
      setColumns(1);
    }

    const parent = refCard.current ? refCard.current.offsetParent : null;

    if (parent) {
      parent.scrollTo({
        left: 0,
        behavior: 'auto',
      });
    }
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);

    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const handleScrollTo = (direction) => {
    const parent = refCard.current.offsetParent;

    if (parent) {
      const parentStyle = window.getComputedStyle(parent);
      const gap = parseFloat(parentStyle.gap || '0');
      const cardWidth = refCard.current
        ? refCard.current.offsetWidth + gap
        : 200;

      const scrollAmount =
        direction === 'next' ? columns * cardWidth : -columns * cardWidth;

      parent.scrollTo({
        left: parent.scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
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
            <button
              onClick={() => handleScrollTo('prev')}
              className='blog-button'
            >
              <MdKeyboardDoubleArrowLeft />
            </button>
            <button
              onClick={() => handleScrollTo('next')}
              className='blog-button'
            >
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
          <BlogCard key={blog.id} blog={blog} ref={refCard} />
        ))}
      </motion.div>
    </section>
  );
};

export default Blogs;
