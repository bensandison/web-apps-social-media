// import Axios from "axios";
import { Typography, Container, Card } from "@mui/material";
import { useState, useEffect } from "react";
import Axios from "axios";

function PostTimeline() {
	const [postData, setPostData] = useState();

	useEffect(() => {
		Axios.get("/api/posts/all").then(function (response) {
			setPostData(response.data.data);
			console.log("hi");
		});
	}, []);

	const postComponents = postData?.map((data, index) => (
		<Post data={data} key={index}></Post>
	));

	return (
		<Container maxWidth="xs" padding={2}>
			<Typography variant="h3">Post Timeline</Typography>
			{postComponents}
		</Container>
	);
}

function Post(props) {
	const data = props.data;
	return (
		<Card>
			<Typography variant="subtitle">{data.user_name}</Typography>
			<Typography variant="h4">{data.title}</Typography>
			<Typography variant="body1">{data.body}</Typography>
		</Card>
	);
}

export default PostTimeline;
