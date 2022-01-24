import { Typography, Container, Card, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";

function Post(props) {
	const data = useLocation().state.data;

	return (
		<Container maxWidth="sm">
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
				</Stack>
			</Card>
		</Container>
	);
}

export default Post;
