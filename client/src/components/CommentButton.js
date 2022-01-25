import { Button, Typography } from "@mui/material";
import { ModeCommentOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import axiosError from "../utils/axiosError";

export default function CommentButton({ data }) {
	//runs on first render
	useEffect(() => {
		getCommentCount();
	}, []);

	const [commentCount, setCommentCount] = useState(0);
	function getCommentCount() {
		Axios.get("/api/comments/count/" + data.post_index)
			.then((response) => {
				setCommentCount(response.data.commentCount);
			})
			.catch((error) => {
				axiosError(error);
			});
	}
	return (
		<Button to="/post" component={Link} state={{ data }}>
			<ModeCommentOutlined></ModeCommentOutlined>
			<Typography>{commentCount}</Typography>
		</Button>
	);
}
