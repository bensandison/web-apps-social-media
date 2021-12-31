// import Axios from "axios";
import { Typography, Container } from "@mui/material";
import { useState } from "react";

function PostTimeline() {
	const [posts, setPosts] = useState();

	return (
		<Container maxWidth="xs" padding={2}>
			<Typography variant="h3">Post Timeline</Typography>
			<Typography>hi</Typography>
		</Container>
	);
}

export default PostTimeline;
