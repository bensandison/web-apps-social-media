import { Button, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import axiosError from "../utils/axiosError";
import { Link } from "react-router-dom";

export default function TagsList({ postID }) {
	const [tagData, setTagData] = useState([]);

	// Setting state when component has been unmounted can cause errors:
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	function getTags() {
		Axios.get("/api/tags/" + postID)
			.then(function (response) {
				if (isMounted.current) setTagData(response.data);
			})
			.catch((err) => {
				axiosError(err);
			});
	}

	//runs on first render
	useEffect(() => {
		getTags();
	}, []);

	return (
		<div>
			{tagData.map((el, index) => (
				<Button key={index} to="/tag" component={Link} state={{ el }}>
					{"#" + el.tag}
				</Button>
			))}
		</div>
	);
}
