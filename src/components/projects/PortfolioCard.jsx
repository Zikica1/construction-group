import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const linkVariant = {
  hidden: { opacity: 0, x: '-100%' },
  visible: {
    opacity: 1,
    x: '0%',
    transition: {
      opacity: {
        type: 'tween',
        duration: 0.25,
        ease: 'easeIn',
      },
      x: {
        type: 'tween',
        duration: 0.35,
        delay: 0.25,
      },
    },
  },
  exit: {
    opacity: 0,
    x: '150%',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const titleVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.5,
      ease: 'easeIn',
    },
  },
};

const PortfolioCard = ({
  item,
  searchParams,
  filterType,
  isActive,
  setActiveCardId,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleClick = () => {
    if (isMobile) {
      if (isActive) {
        setActiveCardId(null);
      } else {
        setActiveCardId(item.id);
      }
    }
  };

  return (
    <div
      className='port-card'
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
      onClick={isMobile ? handleClick : undefined}
    >
      <img
        className='port-card-img'
        srcSet={`${item.imgMob} 413w, ${item.imgUrl} 768w`}
        size='(max-width: 500px) 413px, (max-width: 768px) 768px'
        src={item.imgUrl}
        alt={item.type}
      />
      <div className='port-card-detail'>
        <AnimatePresence>
          {(isActive || isHover) && (
            <motion.div
              className='port-card-link'
              key='hover-link'
              variants={linkVariant}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <Link
                to={`/projects/${item.id}`}
                state={{
                  search: `?${searchParams.toString()}`,
                  type: filterType,
                }}
              >
                <MdKeyboardDoubleArrowRight />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{ height: '50px', marginBlock: '0.25em' }}
          variants={titleVariant}
          initial='hidden'
          animate={isHover ? 'visible' : 'hidden'}
        >
          <h3>{item.title}</h3>
          <h4>{item.type}</h4>
        </motion.div>
      </div>
    </div>
  );
};

PortfolioCard.propTypes = {
  item: PropTypes.object,
  searchParams: PropTypes.object,
  filterType: PropTypes.string,
  isActive: PropTypes.bool,
  setActiveCardId: PropTypes.func,
};

PortfolioCard.displayName = 'PortfolioCard';

export default PortfolioCard;
