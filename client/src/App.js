import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LogInForm from "./pages/LogInForm";
import SignUpForm from "./pages/SignUpForm";

function App() {
	return (
		<Container>
			<Router>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/signup">Sign Up</Link>
					<Link to="/login">Log In</Link>
				</nav>
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signup" element={<SignUpForm />} />
						<Route path="/login" element={<LogInForm/>}/>
					</Routes>
				</main>
			</Router>
		</Container>
	);
}

export default App;
