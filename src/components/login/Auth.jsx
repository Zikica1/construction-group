import './auth.css';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axiosMain from '../../api/axios';
import useAuth from '../../api/hooks/useAuth';
import '../register/register.css';

const Auth = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosMain.post('/auth', { user, pwd });

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, roles, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password');
      } else if (err.response?.status === 401) {
        setErrMsg('User is not unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  return (
    <section className='register'>
      <div className='register-wrapper'>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
          {errMsg}
        </p>
        <form className='form-register' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input
            ref={userRef}
            type='text'
            autoComplete='off'
            required
            id='username'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            required
            id='password'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button>Sign in</button>
          <div className='persist-check'>
            <input
              type='checkbox'
              id='persist'
              checked={persist}
              onChange={togglePersist}
            />
            <label htmlFor='persist'>Trust This Device</label>
          </div>
        </form>
        <p>
          Need an Account?
          <br />
          <span className='line'>
            <Link to='/register'>Sign in</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Auth;
