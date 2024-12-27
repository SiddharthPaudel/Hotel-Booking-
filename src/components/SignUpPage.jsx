
import './SignUpPage.css';

const SignUpPage = () => {
  return (
    <div className="registration-container">
      <form className="registration-form">
        <div className="head">
          <h2>Register</h2>
        </div>
        <p className="welcome-back">Welcome! Please fill in the details to create an account.</p>

        {/* Name Field */}
        <div className="input-container">
          <p>Username:</p>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Enter your name"
            />
            <label htmlFor="floatingName">Username</label>
          </div>
        </div>

        {/* Email Field */}
        <div className="input-container">
          <p>Email:</p>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="Enter your email"
            />
            <label htmlFor="floatingEmail">Email</label>
          </div>
        </div>

        {/* Password Field */}
        <div className="input-container">
          <p>Password:</p>
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

        {/* Confirm Password Field */}
        <div className="input-container">
          <p>Confirm Password:</p>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingConfirmPassword"
              placeholder="Confirm your password"
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </div>
        </div>

        {/* Register Button */}
        <button className="btn btn-primary register-btn" type="submit">Register</button>

        {/* Login Link */}
        <div className="login-link">
          Already have an account? <span className="login-link-text" onClick={() => window.location.href = '/login'}>Login</span>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
