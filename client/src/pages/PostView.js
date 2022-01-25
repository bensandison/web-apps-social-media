import { Card, Container, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Post from "../components/Post";
import FormikTextInput from "../components/FormikTextInput";

export default function PostView(props) {
	const data = useLocation().state.data; //Get post data

	return (
		<Container maxWidth="sm">
			<Stack spacing={2}>
				<Post data={data}></Post>
				<Card>
					<Typography>Add Comment:</Typography>
					<Typography variant="h4">Log In:</Typography>
					<FormikTextInput name="email" label="Email Adress:" />
				</Card>
			</Stack>
		</Container>
	);
}
