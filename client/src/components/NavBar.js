import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<>
			<AppBar postition="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<NavBarElement to="/signup" text="Sign Up"></NavBarElement>
						<NavBarElement to="/login" text="Log In"></NavBarElement>
						<NavBarElement to="/post" text="Create Post"></NavBarElement>
						<NavBarElement to="/timeline" text="Post Timeline"></NavBarElement>
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar></Toolbar>
		</>
		// Empty Toolbar used to move other content from bellow AppBar
	);
}

function NavBarElement(props) {
	return (
		<Link to={props.to} style={{ textDecoration: "none" }}>
			<Typography variant="h6" sx={{ color: "white", mx: 1 }}>
				{props.text}
			</Typography>
		</Link>
	);
}

export default NavBar;
