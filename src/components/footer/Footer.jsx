import './footer.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { footerLinks } from '../data/db';
import { footerContact } from '../data/db';

const Footer = () => {
  const [email, setEmail] = useState('');

  const date = new Date();

  const location = useLocation();
  const isAdmin = location.pathname !== '/admin';

  return (
    <>
      {isAdmin && (
        <footer className='footer'>
          <div className='footer-top-wrap grid'>
            <div className='footer-social-networks'>
              <div className='logo'>
                <img src='/pictures/logo-footer.png' alt='logo' />
              </div>
              <p>
                In a professional context it often happens that private or
                corporate clients a publication to be made and presented with
                the actual content
              </p>

              <ul className='footer-icons-wrap'>
                <li>
                  {' '}
                  <Link>
                    {' '}
                    <FaFacebookF />
                  </Link>
                </li>
                <li>
                  {' '}
                  <Link>
                    {' '}
                    <FaTwitter />
                  </Link>
                </li>
                <li>
                  {' '}
                  <Link>
                    {' '}
                    <FaLinkedinIn />
                  </Link>
                </li>
                <li>
                  {' '}
                  <Link>
                    {' '}
                    <FaInstagram />
                  </Link>
                </li>
              </ul>
            </div>

            <div className='footer-links'>
              <h4>Useful Links</h4>
              {footerLinks.map((item) => (
                <ul key={item.id}>
                  {item.links.map((value, i) => (
                    <li key={i}>{value.list}</li>
                  ))}
                </ul>
              ))}
            </div>

            <div className='footer-contact'>
              <h4>Contact Us</h4>
              {footerContact.map((item) => (
                <ul key={item.id}>
                  {item.links.map((value, i) => (
                    <li key={i}>{value.list}</li>
                  ))}
                </ul>
              ))}
            </div>

            <div className='footer-newsletter'>
              <h4>Newsletter</h4>
              <p>
                Subscribe to our MailChimp newsletter and stay up to date with
                all events coming straight in your mailbox:
              </p>

              <form
                className='footer-form-email'
                onSubmit={(e) => e.preventDefault()}
              >
                <label id='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  autoCapitalize='off'
                  placeholder='Your email addres'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button>
                  <MdKeyboardDoubleArrowRight />
                </button>
              </form>
            </div>
          </div>

          <div className='footer-bottom'>
            &copy; {date.getFullYear()} Construction Group. All right reserved.
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
