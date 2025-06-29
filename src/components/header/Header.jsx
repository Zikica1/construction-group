import './header.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useIsMobile from '../../api/hooks/useIsMobile';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [NavComponent, setNavComponent] = useState(null);
  const location = useLocation();
  const isMobile = useIsMobile();

  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!NavComponent) {
      import('./Navigate')
        .then((module) => {
          const LoadedComponent = module.default;
          if (typeof LoadedComponent === 'function') {
            setNavComponent(() => LoadedComponent);
          } else {
            console.error('Loaded component is not a function:', module);
          }
        })
        .catch(console.error);
    }
  }, [NavComponent]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <header className={`${isHome ? 'header-home' : 'header'} header-main`}>
      <Link to='/' className='logo'>
        <img src='/pictures/header/Logo-header.png' alt='logo' />
      </Link>

      {NavComponent && (!isMobile || (isMobile && isOpen)) && (
        <NavComponent isOpen={isOpen} />
      )}

      <button
        onClick={toggleMenu}
        className={`${isOpen ? 'open' : ''} hamburger-menu`}
      >
        <span className='hamburger-top'></span>
        <span className='hamburger-middle'></span>
        <span className='hamburger-bottom'></span>
      </button>
    </header>
  );
};

export default Header;
