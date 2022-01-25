import { Typography, Button } from "@mui/material";
import Axios from "axios";
import axiosError from "../utils/axiosError";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState, useEffect } from "react";

export default function LikeButton({ data }) {
	//runs on first render
	useEffect(() => {
		getLikes();
	}, []);

	// Post state (has user liked post?, post like count)
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(null);

	// API functions:
	function getLikes() {
		Axios.get("/api/likes/" + data.post_index)
			.then((response) => {
				setLiked(response.data.hasLiked);
				setLikeCount(response.data.likeCount);
			})
			.catch((error) => {
				axiosError(error);
			});
	}
	function toggleLike() {
		Axios.post("/api/likes/" + data.post_index)
			.then(() => {
				getLikes();
			})
			.catch((error) => {
				axiosError(error);
			});
	}
	return (
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
	);
}
