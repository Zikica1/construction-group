import './contactCom.css';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { contact } from '../data/db';
import ContactCard from './ContactCard';
import Heading from '../header/Heading';
import useAxiosPrivate from '../../api/hooks/useAxiosPrivate';
import { FaCheck } from 'react-icons/fa';

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
  const [msgErr, setMsgErr] = useState(null);
  const [status, setStatus] = useState('typing');
  const ref = useRef(null);
  const refForm = useRef(null);
  const refErr = useRef(null);
  const timeoutRef = useRef(null);
  const sendingRef = useRef(null);

  const axiosPrivate = useAxiosPrivate();

  const isInView = useInView(ref, {
    once: true,
    amount: 0.7,
  });

  const isInView2 = useInView(refForm, {
    once: true,
    amount: 0.35,
  });

  useEffect(() => {
    if (status === 'sent') {
      timeoutRef.current = setTimeout(() => {
        setStatus('typing');
        sendingRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 3500);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [status]);

  const handleChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSending = () => {
  //   sendingRef.current?.scrollIntoView({ behavior: 'smooth' });

  //  timeoutRef.current = setTimeout(() => {
  //     setStatus('typing');
  //   }, 3500);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await axiosPrivate.post('/contact', {
        name: message.name,
        email: message.mail,
        subject: message.subject,
        text: message.text,
      });
      setMsgErr(null);
      setMessage({
        name: '',
        mail: '',
        subject: '',
        text: '',
      });
      setStatus('sent');
    } catch (err) {
      if (!err?.response) {
        setMsgErr('No server response');
      } else if (err.response.status === 400) {
        setMsgErr('One of the fields name,email,subject,text is missing');
      } else {
        setMsgErr('Sending failed');
      }

      refErr.current?.scrollIntoView({ behavior: 'smooth' });
      setStatus('typing');
    }
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
          <p ref={refErr} className={msgErr !== null ? 'errmsg' : 'offscreen'}>
            {msgErr}
          </p>
          <div
            ref={sendingRef}
            className={status === 'sent' ? 'isSending' : 'offScreen'}
            style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}
          >
            <p className='message-success'>Message sent</p>
            <FaCheck className='icon-valid' />
          </div>

          {status === 'sending' && <p>Sending...</p>}

          <motion.form
            className='contact-form'
            onSubmit={handleSubmit}
            ref={refForm}
            variants={varianForm}
            initial='hidden'
            animate={isInView2 ? 'visible' : 'hidden'}
          >
            <label name='name'>
              <input
                type='text'
                name='name'
                autoComplete='off'
                id='name'
                placeholder='Name'
                required
                value={message.name}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label htmlFor='email'>
              <input
                type='email'
                name='mail'
                autoComplete='off'
                id='email'
                placeholder='E-mail'
                required
                value={message.mail}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label name='subject'>
              <input
                type='text'
                name='subject'
                autoComplete='off'
                id='subject'
                placeholder='Subject'
                required
                value={message.subject}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label name='text'>
              <textarea
                name='text'
                id='text'
                placeholder='Message'
                required
                value={message.text}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </label>
            <div style={{ textAlign: 'right' }}>
              <button
                disabled={status === 'sending' || message.text.length === 0}
              >
                Submit
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactCom;
