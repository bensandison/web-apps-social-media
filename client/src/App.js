import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";
import LogInForm from "./pages/LogInForm";
import SignUpForm from "./pages/SignUpForm";
import CreatePost from "./pages/CreatePost";
import PostTimeline from "./pages/PostTimeline";
import PostView from "./pages/PostView";

function App() {
	return (
		<Container
			style={{
				backgroundColor: "#f5f5f5",
				minHeight: "100vh",
				minWidth: "100%",
			}}
		>
			<Router>
				<Container component="nav">
					<NavBar></NavBar>
				</Container>
				<Container component="main" sx={{ pt: 2 }}>
					<Routes>
						<Route path="/"></Route>
						<Route path="/welcome" element={<WelcomePage />} />
						<Route path="/signup" element={<SignUpForm />} />
						<Route path="/login" element={<LogInForm />} />
						<Route path="/createpost" element={<CreatePost />} />
						<Route path="/timeline" element={<PostTimeline />} />
						<Route path="/post" element={<PostView />} />
					</Routes>
				</Container>
			</Router>
		</Container>
	);
}

export default App;
