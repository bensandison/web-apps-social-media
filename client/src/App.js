import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SignUpForm from "./pages/SignUpForm";

function App() {
	return (
		<Router>
			<nav className="px-3 text-xl flex flex-row justify-center">
				<Link to="/" className="p-3 m-1 border-2 font font-bold">
					Home
				</Link>
				<Link to="/signup" className="p-3 m-1 border-2 font-bold">
					Sign Up
				</Link>
			</nav>
			<main className="p-5 max-w-7xl mx-auto">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUpForm />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
