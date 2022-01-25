import { Container, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function WelcomePage() {
	return (
		<Container maxWidth="sm">
			<Stack spacing={2}>
				<Typography variant="h4">Welcome</Typography>
				<Button to="/login" component={Link} variant="contained" sx={{ p: 2 }}>
					Log In
				</Button>
				<Button to="/signup" component={Link} variant="contained" sx={{ p: 2 }}>
					Sign Up
				</Button>
			</Stack>
		</Container>
	);
}
