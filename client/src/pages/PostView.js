import { Card, Container, Stack, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import Post from "../components/Post";
import CommentCard from "../components/CommentCard";
import FormikTextInput from "../components/FormikTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import axiosError from "../utils/axiosError";

export default function PostView(props) {
	const data = useLocation().state.data; //Get post data

	// Setting state when component has been unmounted can cause errors:
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	//runs on first render
	useEffect(() => {
		getComments();
	}, []);

	// stores comments on this post
	const [comments, setComments] = useState([]);

	function getComments() {
		Axios.get("/api/comments/" + data.post_index)
			.then(function (response) {
				if (isMounted.current) setComments(response.data);
			})
			.catch((err) => {
				axiosError(err);
			});
	}

	function submitComment(values) {
		setTimeout(() => {
			Axios.post("/api/comments/" + data.post_index, values)
				.then((response) => {
					getComments();
				})
				.catch((error) => {
					axiosError(error);
				});
		}, 400);
	}

	return (
		<Container maxWidth="sm" sx={{ pb: 2 }}>
			<Stack spacing={2}>
				<Post data={data}></Post>
				<Card sx={{ p: 2 }}>
					<Formik
						initialValues={{ body: "" }}
						validationSchema={Yup.object({
							body: Yup.string()
								.required("Comment Body Required")
								.max(40, "40 characters or less required"),
						})}
						onSubmit={(values) => {
							submitComment(values);
						}}
					>
						<Form>
							<Stack spacing={2}>
								<FormikTextInput name="body" label="Add Comment..." multiline />
								<Button variant="contained" type="submit">
									Submit
								</Button>
							</Stack>
						</Form>
					</Formik>
				</Card>
				{comments?.map((data, index) => (
					<CommentCard data={data} key={index}></CommentCard>
				))}
			</Stack>
		</Container>
	);
}
