import { Typography, Container, Card, Stack } from "@mui/material";

import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

function Post({ data }) {
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
					<LikeButton data={data} />
					<CommentButton data={data} />
				</Container>
			</Stack>
		</Card>
	);
}

export default Post;
