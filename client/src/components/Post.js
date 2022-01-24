import { Typography, Container, Card, Stack, Button } from "@mui/material";
import {
	Favorite,
	FavoriteBorder,
	ModeComment,
	ModeCommentOutlined,
} from "@mui/icons-material";
import Axios from "axios";
import axiosError from "../utils/axiosError";
import { useState, useEffect } from "react";

function Post(props) {
	// Has this user liked or commented?
	// TODO: set these from DB
	const data = props.data;

	// LIKES CODE:
	// Post state (has user liked post?, post like count)
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(null);
	function getLikes() {
		Axios.get("/api/likes/" + data.post_index)
			.then((response) => {
				console.log(response);
				setLiked(response.data.hasLiked);
				setLikeCount(response.data.likeCount);
			})
			.catch((error) => {
				axiosError(error);
			});
	}
	function toggleLike() {
		Axios.post("/api/likes/" + data.post_index)
			.then((response) => {
				console.log(response);
				setLiked(response.data.likeStatus);
			})
			.catch((error) => {
				axiosError(error);
			});
	}

	const [commented, setCommented] = useState(false);
	const [commentCount, setCommentCount] = useState(null);

	//runs on first render
	useEffect(() => {
		getLikes();
	}, []);

	return (
		<Card sx={{ p: 2 }}>
			<Stack spacing={1}>
				<Typography variant="subtitle">{data.user_name}</Typography>
				<Typography variant="h5">{data.title}</Typography>
				<Typography variant="body1">{data.body}</Typography>
				{data.image_name && (
					//if image provided:
					<img
						src={"/uploads/" + data.image_name}
						alt={data.title}
						style={{ maxHeight: 200, maxWidth: 200 }}
					/>
				)}
				<Container>
					<Button
						onClick={function () {
							//add/remove comment from db
							toggleLike(); //call db
							setLiked((prevState) => !prevState); // Instantly toggle state
						}}
					>
						{liked ? <Favorite></Favorite> : <FavoriteBorder></FavoriteBorder>}
						<Typography>{likeCount}</Typography>
					</Button>
					<Button
						onClick={function () {
							//add/remove comment from db
						}}
					>
						{commented ? (
							<ModeComment></ModeComment>
						) : (
							<ModeCommentOutlined></ModeCommentOutlined>
						)}
					</Button>
				</Container>
			</Stack>
		</Card>
	);
}

export default Post;
