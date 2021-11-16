import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";

function App() {
	return (
		<Router>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
			</nav>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
		</Router>
	);
}

export default App;
