import { Typography, Container, Stack } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import axiosError from "../utils/axiosError";
import Post from "../components/Post";

// Shows posts which used a certain tag:
export default function UsedTags({ tag }) {
	console.log(tag);
	const [postData, setPostData] = useState();

	// Setting state when component has been unmounted can cause errors:
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	function getData() {
		Axios.get("/api/tags/posts/" + tag.id)
			.then(function (response) {
				if (isMounted.current) setPostData(response.data.data);
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
