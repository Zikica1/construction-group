import './aboutCom.css';
import { about } from '../data/db';
import { FaCheck } from 'react-icons/fa';

const AboutCom = () => {
  return (
    <section className='about-company'>
      <div className='about-company-wrap'>
        <div className='company-img-wrap'>
          <div className='company-img-1'>
            <img src='/pictures/aboutCom/aboutCom-img-1.jpg' alt='about-img' />
          </div>
          <div className='company-img-2'>
            <img src='/pictures/aboutCom/aboutCom-img-2.jpg' alt='about-img' />
          </div>
        </div>

        <div className='company-detail'>
          <h2>
            <span>About Constructions Group</span>
            Innovative buildings with new materials
          </h2>

          <p>
            Our company is at the forefront of innovative construction,
            combining advanced techniques with cutting-edge materials to
            redefine modern architecture. Sustainability drives every project.
          </p>
          <p>
            We deliver exceptional buildings that prioritize functionality,
            aesthetics, and environmental impact, creating spaces that inspire
            and endure for future generations.
          </p>

          <ul className='company-det-list'>
            {about.map((a, i) => (
              <li key={i}>
                <FaCheck />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutCom;
