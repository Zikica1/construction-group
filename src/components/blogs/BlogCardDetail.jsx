import './blogCardDetail.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { blogs } from '../data/db';

const BlogCardDetail = () => {
  const [contact, setContact] = useState({
    person: '',
    email: '',
    website: '',
    comment: '',
  });
  const [approval, setApproval] = useState(false);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const { id } = useParams();

  const blogDetail = blogs.find((b) => b.id === id);

  if (!blogDetail) {
    return <div>Blog not found</div>;
  }

  return (
    <div className='blog-detail-card'>
      <div className='blog-detail-img'>
        <img src={blogDetail.img} alt='blog-detail-img' />
      </div>

      <div className='blog-detail-card-wrap'>
        <h1>{blogDetail.title}</h1>

        <div className='blog-detail-text-wrap'>
          {blogDetail.text.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>

        <div className='blog-detail-form'>
          <h2>Add a Comment</h2>
          <p>
            Your email address will not be published. Required fields are marked
            *
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor=''>
              Name (required)
              <input
                type='text'
                name='person'
                id='person'
                required
                value={contact.person}
                onChange={handleChange}
              />
            </label>
            <label htmlFor=''>
              E-Mail (required)
              <input
                type='email'
                required
                value={contact.email}
                name='email'
                onChange={handleChange}
              />
            </label>
            <label htmlFor=''>
              Website
              <input
                type='text'
                name='website'
                id='website'
                value={contact.website}
                onChange={handleChange}
              />
            </label>
            <label htmlFor=''>
              <input
                type='checkbox'
                id='approval'
                checked={approval}
                onChange={(e) => setApproval(e.target.checked)}
              />
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
            <label htmlFor=''>
              Comment
              <textarea
                value={contact.comment}
                id='comment'
                name='comment'
                onChange={handleChange}
              ></textarea>
            </label>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogCardDetail;
