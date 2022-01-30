import { Typography, Container, Stack } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import axiosError from "../utils/axiosError";
import Post from "../components/Post";
import { useLocation } from "react-router-dom";
import ContentStatus from "../components/contentStatuus";

// Shows posts which used a certain tag:
export default function UsedTags(props) {
	const tagData = useLocation().state.el; //Get post data
	console.log(tagData);

	const [postData, setPostData] = useState();
	const [loading, setLoading] = useState(true);

	// Setting state when component has been unmounted can cause errors:
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	function getData() {
		Axios.get("/api/tags/posts/" + tagData.tag_id)
			.then(function (response) {
				if (isMounted.current) {
					setPostData(response.data);
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
			<ContentStatus
				loading={loading}
				contentType={"Posts with #" + tagData.tag}
			></ContentStatus>
		);
	else
		return (
			<Container maxWidth="sm">
				<Stack spacing={2}>
					<Typography variant="h4">#{tagData.tag}</Typography>
					{postData?.map((data, index) => (
						<Post data={data} key={index}></Post>
					))}
				</Stack>
			</Container>
		);
}
