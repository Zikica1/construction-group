import './nextProject.css';
import ButtonQuote from '../buttons/ButtonQuote';

const NextProject = () => {
  return (
    <section className='next-project'>
      <div className='next-project-wrap'>
        <div className='next-project-detail'>
          <h3>
            looking for a quality and affordable constructor for your{' '}
            <span>next project?</span>
          </h3>
          <ButtonQuote text='Request A Quote' />
        </div>

        <div className='next-project-img'>
          <img src='/pictures/nextProject/next-project-img.png' alt='' />
        </div>
      </div>
    </section>
  );
};

export default NextProject;
