import './register.css';
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import axiosMain from '../../api/axios';
import useLogout from '../../api/hooks/useLogout';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const logout = useLogout();
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const singOut = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    errRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosMain.post(REGISTER_URL, JSON.stringify({ user, pwd }), {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }

      errRef.current.focus();
    }
  };

  return (
    <section className='register'>
      <div className='register-wrapper'>
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live='assertive'
        >
          {errMsg}
        </p>
        <h1>Register</h1>
        <form className='form-register' onSubmit={handleSubmit}>
          <label htmlFor='username'>
            Username:
            <FaCheck className={validName ? 'valid' : 'hide'} />
            <FaTimes className={validName || !user ? 'hide' : 'invalid'} />
          </label>
          <input
            ref={userRef}
            type='text'
            id='username'
            autoComplete='off'
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id='uidnote'
            className={
              userFocus && user && !validName ? 'instructions' : 'offscreen'
            }
          >
            <FaInfoCircle />
            4 to 24 characters
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores,hyphens allowed.
          </p>
          <label htmlFor='password'>
            Password:
            <FaCheck className={validPwd ? 'valid' : 'hide'} />
            <FaTimes className={validPwd || !pwd ? 'hide' : 'invalid'} />
          </label>
          <input
            type='password'
            id='password'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-describedby='pwdnote'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id='pwdnote'
            className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
          >
            <FaInfoCircle />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{' '}
            <span aria-label='exclamation mark'>!</span>{' '}
            <span aria-label='at symbol'>@</span>{' '}
            <span aria-label='hashtag'>#</span>{' '}
            <span aria-label='dollar sign'>$</span>{' '}
            <span aria-label='percent'>%</span>
          </p>
          <label htmlFor='confirm_pwd'>
            Confirm Password:
            <FaCheck className={validMatch && matchPwd ? 'valid' : 'hide'} />
            <FaTimes className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
          </label>
          <input
            type='password'
            id='confirm_pwd'
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? 'false' : 'true'}
            aria-describedby='confirmnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id='confirmnote'
            className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
          >
            <FaInfoCircle />
            Must match the first password input field.
          </p>
          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
          >
            Sign Up
          </button>
        </form>
        <p>Already registered?</p>
        <div
          style={{
            display: 'flex',
            gap: '1em',
            alignItems: 'center',
            marginBlockStart: '1em',
          }}
        >
          <span className='line'>
            <Link to='/login'>Log In</Link>
          </span>
          <button className='logout' onClick={singOut}>
            Log out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
