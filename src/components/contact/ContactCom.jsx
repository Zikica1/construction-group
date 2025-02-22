import './contactCom.css';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { contact } from '../data/db';
import ContactCard from './ContactCard';
import Heading from '../header/Heading';

const variantMap = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'tween',
      duration: 0.8,
    },
  },
};

const variantHead = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.8,
    },
  },
};

const varianForm = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.8,
    },
  },
};

const ContactCom = () => {
  const [message, setMessage] = useState({
    name: '',
    mail: '',
    subject: '',
    text: '',
  });
  const ref = useRef(null);
  const refForm = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.7,
  });

  const isInView2 = useInView(refForm, {
    once: true,
    amount: 0.35,
  });

  const handleChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className='contact-com'>
      <div className='contact-com-wrap'>
        <div className='contact-com-top'>
          <motion.div
            className='contact-com-img'
            variants={variantMap}
            initial='hidden'
            animate='visible'
          >
            {' '}
            <picture>
              <source
                srcSet='/pictures/contact/contact-map-413px.webp'
                media='(max-width:500px)'
              />
              <source
                srcSet='/pictures/contact/contact-map-680px.webp'
                media='(max-width:768px)'
              />
              <source
                srcSet='/pictures/contact/contact-map-950px.webp'
                media='(max-width:1040px)'
              />
              <img
                src='/pictures/contact/contact-map-750px.webp'
                alt='contact-map'
              />
            </picture>
            <Link className='logo'>
              <img src='/pictures/contact/google-logo.jpg' alt='google-logo' />
            </Link>
          </motion.div>

          <ul className='contact-com-information'>
            {contact.map((c) => (
              <ContactCard key={c.id} item={c} />
            ))}
          </ul>
        </div>

        <div className='contact-com-bottom'>
          <motion.div
            ref={ref}
            variants={variantHead}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
          >
            <Heading title='Get In Touch' subtitle='Contact Us' isRow={true} />
            <p>
              Your email address will not be published. Required fields are
              marked *
            </p>
          </motion.div>

          <motion.form
            className='contact-form'
            onSubmit={(e) => e.preventDefault()}
            ref={refForm}
            variants={varianForm}
            initial='hidden'
            animate={isInView2 ? 'visible' : 'hidden'}
          >
            <label name='name'>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                value={message.name}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label name='email'>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='E-mail'
                value={message.mail}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label name='subject'>
              <input
                type='text'
                name='subject'
                id='subject'
                placeholder='Subject'
                value={message.subject}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label name='text'>
              <textarea
                name='text'
                id='text'
                placeholder='Message'
                value={message.text}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </label>
            <div style={{ textAlign: 'right' }}>
              <button>Submit</button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactCom;
