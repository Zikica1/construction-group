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
          <img
            srcSet='/pictures/nextProject/next-project-558px-img.png 558w,/pictures/nextProject/next-project-800px-img.png 800w,/pictures/nextProject/next-project-1300px-img.png 1300w'
            sizes='(max-width: 500px) 558px,(max-width: 768px) 800px,(max-width: 1200px) 1300px'
            src='/pictures/nextProject/next-project-img.png'
            alt='background-img'
          />
        </div>
      </div>
    </section>
  );
};

export default NextProject;
