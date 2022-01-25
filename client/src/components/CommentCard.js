import { Card, Typography } from "@mui/material";

export default function CommentCard({ data }) {
	return (
		<Card sx={{ p: 2 }}>
			<Typography>{data.body}</Typography>
		</Card>
	);
}
