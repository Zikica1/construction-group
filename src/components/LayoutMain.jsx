import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';
import ScrollToTop from './ScrollToTop';
import NextProject from './nextProject/NextProject';
import Footer from './footer/Footer';
const LayoutMain = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Header key={location.pathname} />
      <Outlet />
      <NextProject />
      <Footer />
    </>
  );
};

export default LayoutMain;
