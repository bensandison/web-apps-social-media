import { Typography, Container, Card, Stack, Avatar } from "@mui/material";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import TagsList from "./TagsList";

function Post({ data }) {
	return (
		<Card sx={{ p: 2 }}>
			<Stack spacing={1}>
				<Stack direction="row" spacing={1}>
					<Avatar
						src={
							"https://avatars.dicebear.com/api/pixel-art/" +
							data.user_id +
							".svg"
						}
						alt="avatar"
						variant="square"
					/>
					<Typography variant="subtitle">{data.user_name}</Typography>
				</Stack>
				<Typography variant="h5">{data.title}</Typography>
				<Typography variant="body1">{data.body}</Typography>
				<TagsList postID={data.post_index} />
				{data.image_name && (
					//if image provided:
					<img
						src={"/uploads/" + data.image_name}
						alt={data.title}
						style={{ maxHeight: 200, maxWidth: 200 }}
					/>
				)}
				<Container className="post-interactions">
					<LikeButton data={data} />
					<CommentButton data={data} />
				</Container>
			</Stack>
		</Card>
	);
}

export default Post;
