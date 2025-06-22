import useAuth from './useAuth';
import axiosMain from '../axios';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosMain.get('/refresh', { withCredentials: true });

    setAuth((prev) => {
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
