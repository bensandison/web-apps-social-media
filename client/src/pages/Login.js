function Login() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Login:</h2>
      <form>
        <input placeholder="username" type="text"></input>
        <input placeholder="password" type="text"></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default Login;
