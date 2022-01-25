import { Box, CircularProgress, Typography, Stack } from "@mui/material";

export default function LoadingPage() {
	return (
		<Stack
			spacing={2}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "90vh",
			}}
		>
			<CircularProgress></CircularProgress>
			<Typography variant="subtitle1">Loading... </Typography>
		</Stack>
	);
}
