import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const BlogCard = forwardRef(({ blog, index }, ref) => {
  return (
    <div ref={index.toString() === blog.id ? ref : null} className='blog-card'>
      <Link to={`/blog/${blog.id}`}>
        <div className='blog-card-img'>
          <img src={blog.imgUrl} alt={`img-${blog.title}`} />
        </div>
        <div className='blog-card-title'>
          <div className='blog-card-date'>
            <p>{blog.date}</p>
          </div>
          <h3>{blog.title}</h3>
        </div>
      </Link>
    </div>
  );
});
BlogCard.propTypes = {
  blog: PropTypes.object,
  index: PropTypes.number,
};

BlogCard.displayName = 'BlogCard';

export default BlogCard;
