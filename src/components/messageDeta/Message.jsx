import './messageDet.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../api/hooks/useAxiosPrivate';
import useAuth from '../../api/hooks/useAuth';

const Message = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [messageDet, setMessageDet] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.accessToken) return <p>Loading messages...</p>;

    let isMounted = true;
    const controller = new AbortController();

    const getMessages = async () => {
      try {
        const result = await axiosPrivate.get(`/contact/${id}`, {
          signal: controller.signal,
        });

        isMounted && setMessageDet(result.data);
      } catch (err) {
        if (err.name === 'CanceledError') {
          console.log('Request canceled');
        } else {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
        }
      }
    };

    getMessages();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, id, navigate, auth?.accessToken]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Ary you sure you want to delete message'
    );
    if (!confirmDelete) return;

    try {
      await axiosPrivate.delete(`/contact/${id}`);
      navigate('/admin', { replace: true });
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  return (
    <section className='message-detail'>
      {messageDet ? (
        <>
          <div className='message-header'>
            <h2>{messageDet.subject}</h2>
            <p className='message-email'>
              <strong>From:</strong>
              {messageDet.email}
            </p>
            <p className='message-date'>
              <strong>Date:</strong>
              {messageDet.createdAt}
            </p>
          </div>

          <p className='message-det-body'>{messageDet.text}</p>
          <button onClick={handleDelete} className='delete-button'>
            Delete Message
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default Message;
