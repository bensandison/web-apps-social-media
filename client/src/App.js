import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import LogInForm from "./pages/LogInForm";
import SignUpForm from "./pages/SignUpForm";
import CreatePost from "./pages/CreatePost";
import PostTimeline from "./pages/PostTimeline";

function App() {
	return (
		<Container>
			<Router>
				<nav>
					<NavBar></NavBar>
				</nav>
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signup" element={<SignUpForm />} />
						<Route path="/login" element={<LogInForm />} />
						<Route path="/post" element={<CreatePost />} />
						<Route path="/timeline" element={<PostTimeline />} />
					</Routes>
				</main>
			</Router>
		</Container>
	);
}

export default App;
