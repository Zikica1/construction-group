import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../api/hooks/useAxiosPrivate';
import Feed from './Feed';
import useAuth from '../../api/hooks/useAuth';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // if (!auth?.accessToken) return <p>Loading messages...</p>;
    // sačekaj dok token nepostoji,accessToken je istekao, axiosPrivate šalje zahtev odmah po mountovanju Messages.jsx, refresh() možda još nije zavšio svoj posao, zahtev odbijen sa 403, tako da čekamo da refresh zavšio svoj posao i dobijemo novi token

    let isMounted = true;
    const controller = new AbortController();

    const getMessages = async () => {
      try {
        const response = await axiosPrivate.get('/contact', {
          signal: controller.signal,
        });

        isMounted && setMessages(response.data);
      } catch (err) {
        if (err.name === 'CanceledError') {
          console.log('request canceled');
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
  }, [axiosPrivate, location, navigate, auth?.accessToken]);

  return (
    <section>
      {messages.length ? (
        <Feed messages={messages} />
      ) : (
        <p>No messages to display</p>
      )}
    </section>
  );
};

export default Messages;
