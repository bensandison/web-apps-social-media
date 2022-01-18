import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LogInForm from "./pages/LogInForm";
import SignUpForm from "./pages/SignUpForm";
import CreatePost from "./pages/CreatePost";
import PostTimeline from "./pages/PostTimeline";
import FileUpload from "./pages/fileUpload";

function App() {
	return (
		<Container>
			<Router>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/signup">Sign Up</Link>
					<Link to="/login">Log In</Link>
					<Link to="/post">Create Post</Link>
					<Link to="/timeline">Post Timeline</Link>
					<Link to="/upload">Upload</Link>
				</nav>
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signup" element={<SignUpForm />} />
						<Route path="/login" element={<LogInForm />} />
						<Route path="/post" element={<CreatePost />} />
						<Route path="/timeline" element={<PostTimeline />} />
						<Route path="/upload" element={<FileUpload />} />
					</Routes>
				</main>
			</Router>
		</Container>
	);
}

export default App;
