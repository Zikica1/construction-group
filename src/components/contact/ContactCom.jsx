import './contactCom.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { contact } from '../data/db';
import ContactCard from './ContactCard';
import Heading from '../header/Heading';

const ContactCom = () => {
  const [message, setMessage] = useState({
    name: '',
    mail: '',
    subject: '',
    text: '',
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
          <div className='contact-com-img'>
            {' '}
            <img
              src='/pictures/contact/contact-map-min.png'
              alt='contact-map'
            />
            <Link className='logo'>
              <img src='/pictures/contact/google-logo.jpg' alt='google-logo' />
            </Link>
          </div>

          <ul className='contact-com-information'>
            {contact.map((c) => (
              <ContactCard key={c.id} item={c} />
            ))}
          </ul>
        </div>

        <div className='contact-com-bottom'>
          <Heading title='Get In Touch' subtitle='Contact Us' isRow={true} />
          <p>
            Your email address will not be published. Required fields are marked
            *
          </p>

          <form className='contact-form' onSubmit={(e) => e.preventDefault()}>
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactCom;
