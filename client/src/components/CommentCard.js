import { Card, Typography } from "@mui/material";

export default function CommentCard({ data }) {
	return (
		<Card>
			<Typography>{data.body}</Typography>
		</Card>
	);
}
