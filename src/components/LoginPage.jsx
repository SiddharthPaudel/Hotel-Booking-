import './LoginPage.css';
const LoginPage=()=>{
    return(
      
        <div className="login-container">
      <form className="login-form">
        <div className="head">
          <h2>Login</h2>
        </div>
        <div className="Username ">
          <p>Username: </p>
          <div className="form-floating place ">
            <input
              type="password"
              className="form-control place"
              id="floatingPassword"
              placeholder="Enter your usernamw"
            />
            <label>Username</label>
          </div>
        </div>
        <div className="password">
          <p>Password:</p>
          <div className="form-floating place ">
            <input
              type="password"
              className="form-control "
              id="floatingPassword"
              placeholder="Enter your usernamw"
            />
            <label>Password</label>
          </div>
        </div>
        <br/>
        <p className="forget"> Forget Password?</p>
        <button className="btn btn-primary login-btn" type="submit">Login</button>
      </form>
    </div>
    )
    
}

export default LoginPage;