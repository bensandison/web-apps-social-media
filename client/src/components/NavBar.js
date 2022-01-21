import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<>
			<AppBar postition="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Link to="/" style={{ textDecoration: "none" }}>
							<Typography variant="h6">Home</Typography>
						</Link>
						<Link to="/signup" style={{ textDecoration: "none" }}>
							<Typography variant="h6">Signup</Typography>
						</Link>
						<Link to="/login" style={{ textDecoration: "none" }}>
							<Typography variant="h6">Login</Typography>
						</Link>
						<Link to="/post" style={{ textDecoration: "none" }}>
							<Typography variant="h6">Create Post</Typography>
						</Link>
						<Link to="/timeline" style={{ textDecoration: "none" }}>
							<Typography variant="h6">Post Timeline</Typography>
						</Link>
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar></Toolbar>
		</>
	);
}

export default NavBar;
