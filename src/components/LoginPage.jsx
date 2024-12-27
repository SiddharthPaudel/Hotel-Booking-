import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <div className="head">
          <h2>Login</h2>
        </div>
        
        {/* Welcome Back Text */}
        <div className="welcome-back">
          <p>Welcome Back! Please login to continue.</p>
        </div>

        <div className="input-container">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingUsername"
              placeholder="Enter your username"
            />
            <label htmlFor="floatingUsername">Username</label>
          </div>
        </div>

        <div className="input-container">
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Enter your password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
        </div>

        <div className="forget-container">
          <p className="forget">Forget Password?</p>
        </div>

        <button className="btn btn-primary login-btn" type="submit">
          Login
        </button>

        {/* Signup Redirection */}
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup" className="signup-link-text">Signup</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
