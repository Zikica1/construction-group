import './admin.css';
import Messages from '../messages/Messages';

const AdminMess = () => {
  return (
    <section className='messages'>
      <h1 className='message-title'>Messages List</h1>
      <Messages />
    </section>
  );
};

export default AdminMess;
