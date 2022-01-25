import { Avatar, Card, Typography, Stack } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import axiosError from "../utils/axiosError";

export default function CommentCard({ data }) {
	// Store user data from comment author:
	const [userData, setUserData] = useState({});

	// Setting state when component has been unmounted can cause errors:
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	function getUserData() {
		Axios.get("/api/users/3")
			.then(function (response) {
				if (isMounted.current) setUserData(response.data.data);
			})
			.catch((err) => {
				axiosError(err);
			});
	}

	//runs on first render
	useEffect(() => {
		getUserData();
	}, []);

	return (
		<Card sx={{ p: 2 }}>
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
				<Typography variant="subtitle" sx={{ py: "auto" }}>
					{userData.name}
				</Typography>
			</Stack>

			<Typography variant="h6">{data.body}</Typography>
		</Card>
	);
}
