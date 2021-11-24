import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SignUpForm from "./pages/SignUpForm";

function App() {
	return (
		<Router>
			<nav>
				<Link to="/">
					Home
				</Link>
				<Link to="/signup">
					Sign Up
				</Link>
			</nav>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUpForm />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
