// import Axios from "axios";
import { Typography, Container, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import Axios from "axios";
import axiosError from "../utils/axiosError";
import Post from "../components/Post";

function PostTimeline() {
	const [postData, setPostData] = useState();

	function getData() {
		Axios.get("/api/posts/all")
			.then(function (response) {
				setPostData(response.data.data);
			})
			.catch((err) => {
				axiosError(err);
			});
	}

	//runs on first render
	useEffect(() => {
		getData();
	}, []);

	return (
		<Container maxWidth="sm">
			<Stack spacing={2}>
				<Typography variant="h4">Post Timeline</Typography>
				{postData?.map((data, index) => (
					<Post data={data} key={index}></Post>
				))}
			</Stack>
		</Container>
	);
}

export default PostTimeline;
