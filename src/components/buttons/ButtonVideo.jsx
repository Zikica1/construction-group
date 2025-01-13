import './buttonVideo.css';
import { FaPlay } from 'react-icons/fa';

const ButtonVideo = () => {
  return (
    <button className='button-video'>
      <span className='overlay'></span>
      <span className='text'>Intro Video</span>
      <span className='icon'>
        <FaPlay />
      </span>
    </button>
  );
};

export default ButtonVideo;
