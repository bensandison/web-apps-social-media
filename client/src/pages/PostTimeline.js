// import Axios from "axios";
import { Typography, Container, Card, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import {
	Favorite,
	FavoriteBorder,
	ModeComment,
	ModeCommentOutlined,
} from "@mui/icons-material";
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
			<Stack spacing={2}>
				<Typography variant="h4">Post Timeline</Typography>
				{postData?.map((data, index) => (
					<Post data={data} key={index}></Post>
				))}
			</Stack>
		</Container>
	);
}

function Post(props) {
	// Has this user liked or commented?
	// TODO: set these from DB
	const [liked, setLiked] = useState(false);
	const [commented, setCommented] = useState(false);

	const data = props.data;
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
						height="200"
					/>
				)}
				<Container>
					<Button
						onClick={function () {
							//add/remove comment from db
							setLiked(!liked); //TODO: use callback here
						}}
					>
						{liked ? <Favorite></Favorite> : <FavoriteBorder></FavoriteBorder>}
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

export default PostTimeline;
