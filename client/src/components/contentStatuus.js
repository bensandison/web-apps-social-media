import { Stack, CircularProgress, Typography } from "@mui/material";

// Returns loading animation OR content not found message
export default function ContentStatus({ loading, contentType }) {
	if (loading)
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
				<Typography variant="subtitle1">{contentType} loading...</Typography>
			</Stack>
		);
	else
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
				<Typography variant="h1">{":("}</Typography>
				<Typography variant="subtitle1">
					Oops. {contentType} not found!
				</Typography>
			</Stack>
		);
}
