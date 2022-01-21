import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LogInForm from "./pages/LogInForm";
import SignUpForm from "./pages/SignUpForm";
import CreatePost from "./pages/CreatePost";
import PostTimeline from "./pages/PostTimeline";

function App() {
	return (
		<Container>
			<Router>
				<Container component="nav">
					<NavBar></NavBar>
				</Container>
				<Container component="main" sx={{ pt: 2 }}>
					<Routes>
						<Route path="/signup" element={<SignUpForm />} />
						<Route path="/login" element={<LogInForm />} />
						<Route path="/post" element={<CreatePost />} />
						<Route path="/timeline" element={<PostTimeline />} />
					</Routes>
				</Container>
			</Router>
		</Container>
	);
}

export default App;
