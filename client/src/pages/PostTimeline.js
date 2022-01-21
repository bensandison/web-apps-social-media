// import Axios from "axios";
import { Typography, Container, Card, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import Axios from "axios";

function PostTimeline() {
	const [postData, setPostData] = useState();

	function getData() {
		Axios.get("/api/posts/all").then(function (response) {
			setPostData(response.data.data);
		});
	}

	//runs on first render
	useEffect(() => {
		getData();
	}, []);

	return (
		<Container maxWidth="sm">
			<Stack stack={2}>
				<Typography variant="h3">Post Timeline</Typography>
				{postData?.map((data, index) => (
					<Post data={data} key={index}></Post>
				))}
			</Stack>
		</Container>
	);
}

function Post(props) {
	const data = props.data;
	return (
		<Card sx={{ p: 1, my: 1 }}>
			<Typography variant="subtitle">{data.user_name}</Typography>
			<Typography variant="h4">{data.title}</Typography>
			<Typography variant="body1">{data.body}</Typography>
			{data.image_name && (
				//if image provided:
				<img
					src={"/uploads/" + data.image_name}
					alt={data.title}
					height="200"
				/>
			)}
		</Card>
	);
}

export default PostTimeline;
