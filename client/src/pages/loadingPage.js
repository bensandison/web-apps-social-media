import { CircularProgress, Typography, Stack } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Navigate } from "react-router-dom";

export default function LoadingPage() {
	// Setting state when component has been unmounted can cause errors:
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);

	function getData() {
		if (document.cookie) return setLoading(false);
		Axios.get("/api/posts/all")
			.then(function () {
				// User is logged in:
				if (isMounted.current) {
					setLoggedIn(true);
					setLoading(false);
				}
			})
			.catch((err) => {
				if (isMounted.current) {
					setLoading(false);
				}
			});
	}

	//runs on first render
	useEffect(() => {
		getData();
	}, []);

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
				<Typography variant="subtitle1">Loading... </Typography>
			</Stack>
		);
	else
		return loggedIn ? <Navigate to="/timeline" /> : <Navigate to="/welcome" />;
}
