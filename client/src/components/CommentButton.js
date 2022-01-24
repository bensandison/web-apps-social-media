import { Button } from "@mui/material";
import { ModeComment, ModeCommentOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CommentButton({ data }) {
	// COMMENTS:
	const [commented, setCommented] = useState(false);
	const [commentCount, setCommentCount] = useState(null);
	return (
		<Button to="/post" component={Link} state={{ data }}>
			{commented ? (
				<ModeComment></ModeComment>
			) : (
				<ModeCommentOutlined></ModeCommentOutlined>
			)}
		</Button>
	);
}
