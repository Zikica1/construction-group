import useAuth from './useAuth';
import axiosMain from '../axios';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logOut = async () => {
    setAuth({});

    try {
      await axiosMain('/logout');
    } catch (err) {
      console.error(err);
    }
  };

  return logOut;
};

export default useLogout;
