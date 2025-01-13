import Hero from '../components/home/hero/Hero';
import AboutHer from '../components/home/about/AboutHer';
import Mission from '../components/home/mission/MIssion';
import Services from '../components/home/services/Services';
import Team from '../components/home/team/Team';
import Machines from '../components/home/machines/Machines';
import HomeProjects from '../components/home/homeProjects/HomeProjects';
import Testimonials from '../components/home/testimonials/Testimonials';
import Blogs from '../components/blogs/Blogs';

const Home = () => {
  return (
    <main className='home'>
      <Hero />
      <AboutHer />
      <Mission />
      <Services />
      <Machines />
      <Team />
      <HomeProjects />
      <Testimonials />
      <Blogs />
    </main>
  );
};

export default Home;
