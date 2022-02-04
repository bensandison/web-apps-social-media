// import Axios from "axios";
import { Typography, Container, Stack } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import axiosError from "../utils/axiosError";
import Post from "../components/Post";
import ContentStatus from "../components/contentStatuus";

function PostTimeline() {
	const [postData, setPostData] = useState([]);
	const [loading, setLoading] = useState(true);

	// Setting state when component has been unmounted can cause errors:
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	let startIndex;
	function getStartIndex() {
		Axios.get("/api/posts/start")
			.then(function (response) {
				startIndex = response.data.startIndex;
			})
			.catch((err) => {
				axiosError(err);
			});
	}

	function getData() {
		setLoading(true);
		// If we dont have a start index find one using getStartIndex
		if (!startIndex) getStartIndex();
		// Get batch of posts
		Axios.get("/api/posts/" + 10)
			.then(function (response) {
				if (isMounted.current) {
					// Set post data by concatenating old and new arrays:
					setPostData((oldArray) => [...oldArray, ...response.data.data]);
					startIndex = response.data.startIndex;
					setLoading(false);
				}
			})
			.catch((err) => {
				axiosError(err);
				if (isMounted.current) setLoading(false);
			});
	}

	//runs on first render
	useEffect(() => {
		getData();
	}, []);

	// Return loading animation OR no data found:
	if (!postData || !postData.length)
		return (
			<ContentStatus loading={loading} contentType="Posts Data"></ContentStatus>
		);
	else
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
