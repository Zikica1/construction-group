import './aboutClients.css';
import { aboutClients } from '../data/db';

const AboutClients = () => {
  return (
    <section className='about-clients'>
      <div className='about-clients-wrap'>
        <div className='about-clients-detail'>
          <h2>
            <span>Our Clients</span>
            Happy Customers Trust Us
          </h2>
          <p>
            We take pride in building lasting relationships with our clients,
            delivering exceptional service, and ensuring their satisfaction on
            every project.
          </p>
        </div>
        <div className='about-clients-brands'>
          <ul className='about-brands-wrap'>
            {aboutClients.map((client) => (
              <li key={client.id}>
                <img src={client.imgUrl} alt={client.imgUrl} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutClients;
