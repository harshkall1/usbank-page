import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import body from '../assets/body.png';
import image from '../assets/image.png';
import Loader from '../components/loader/Loader';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response?.data?.message || error.message || 'please try again');
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />

      <br />
      <div className="login-hero">
        <div className="login-banneraera">
          <img src={image} className='banner-popup' alt="" />
        </div>
        <div className="login-form-area">
          <div className="login-box">
            <h2 className="login-welcome-title">ACCOUNT LOGIN</h2>
            <br />

            {/* Error Message Display */}
            {errorMessage && (
              <p className="login-error-message">
                ⚠️ {errorMessage}
              </p>
            )}

            <form onSubmit={handleLogin}>
              <div className="login-input-group">
                <input
                  type="text"
                  className="login-input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=" username"
                />
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "15px"
              }}>
                <div style={{
                  display: "flex",
                  gap: "5px"
                }}>
                  <input type="checkbox" name="check" id="rememberMe" />
                  <label htmlFor="rememberMe" style={{fontWeight: "normal", fontSize: "12px"}}>Remember my username</label>
                </div>
              </div>

              <div className="login-input-group">
                <input
                  type="password"
                  className="login-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <br />

              <button className="login-sign-in-btn" type="submit" disabled={loading}>
                {loading ? <Loader /> : 'Login'}
              </button>
            </form>

            <div className="login-links">
              <a href="#" className="login-link">Forgot username or password? <MdKeyboardArrowRight size={20} />  </a>
              <a href="#" className="login-link">Corporate & Commercial banking login <MdKeyboardArrowRight size={20} /> </a>
              <a href="#" className="login-link login-link-grey ">Enroll in online banking  </a>
            </div>
          </div>
        </div>
      </div>
      <br />

      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;
