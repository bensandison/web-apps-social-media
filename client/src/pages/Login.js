function Login() {
  function submitLogin(e) {}

  return (
    <div style={{ padding: 20 }}>
      <h2>Login:</h2>
      <div className="box">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="login-input"
            placeholder="Username"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Password"
          />
        </div>

        <button type="button" className="login-btn" onClick={submitLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
