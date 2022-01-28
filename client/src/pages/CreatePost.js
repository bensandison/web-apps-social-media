import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { Stack, Button, Typography, Container } from "@mui/material";
import FormikTextInput from "../components/FormikTextInput";
import axiosError from "../utils/axiosError";

const CreatePost = (props) => {
	function submitData(values) {
		// Use multipart form data:
		const formData = new FormData();
		formData.append("title", values.title);
		formData.append("body", values.body);
		formData.append("image", values.file);

		// Standard form:
		setTimeout(() => {
			Axios.post("/api/posts", formData)
				.then((response) => {
					submitTags(response.data.postID);
				})
				.catch(function (error) {
					axiosError(error);
				});
		}, 400);

		function submitTags(postID) {
			// Tags form:
			setTimeout(() => {
				Axios.post("/api/tags/" + postID, { tags: values.tags })
					.then((response) => {
						console.log(response);
					})
					.catch(function (error) {
						axiosError(error);
					});
			}, 400);
		}
	}

	return (
		<Container maxWidth="sm">
			<Formik
				initialValues={{
					title: "",
					body: "",
					tags: "",
					file: null,
				}}
				onSubmit={(values) => {
					submitData(values);
				}}
				// Title and body are required
				validationSchema={yup.object().shape({
					title: yup.string().required("Post title required"),
					body: yup.string().required("Post body required"),
					tags: yup
						.string()
						.matches(
							/^(?:#)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:(?!))){0,28}(?:[A-Za-z0-9_]))?)((?: #)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?))*\s?$/g,
							"Must be hashtags seperated by spaces"
						),
					file: yup.mixed(),
				})}
			>
				{({ values, handleSubmit, setFieldValue }) => {
					return (
						<form onSubmit={handleSubmit}>
							<Stack spacing={2}>
								<Typography variant="h4">Create Post</Typography>
								<FormikTextInput name="title" label="Title:" />
								<FormikTextInput
									name="body"
									label="Post Body:"
									multiline
									minRows={5}
									maxRows={20}
								/>
								<FormikTextInput
									name="tags"
									label="Tags:"
									placeholder="#meme #cool"
								/>
								<Stack className="image-upload-controls" spacing={2}>
									<Button
										variant="outlined"
										component="label"
										style={{ width: "100%" }}
										onClick={function () {
											// If a file exists remove the file
											if (!values.file) return;
											setFieldValue("file", null);
										}}
									>
										{!values.file ? "Upload Image" : "Change Image"}
										{
											// Only render image upload if image does not exist:
											!values.file && (
												<input
													id="file"
													name="file"
													type="file"
													hidden
													onChange={(event) => {
														setFieldValue("file", event.currentTarget.files[0]);
													}}
												/>
											)
										}
									</Button>
									<Thumbnail
										file={values.file}
										deleteFile={function () {
											// Callback funciton to delete picture file
											setFieldValue("file", false);
										}}
									/>
								</Stack>
								<Button variant="contained" type="submit">
									Submit
								</Button>
							</Stack>
						</form>
					);
				}}
			</Formik>
		</Container>
	);
};

function Thumbnail(props) {
	// Set loading true by default
	const [loading, setLoading] = useState(true);
	const [thumbImage, setThumbImage] = useState();

	// If no file uploaded return no elements
	if (!props.file) return null;

	// Get file:
	let reader = new FileReader();
	reader.readAsDataURL(props.file);
	reader.onloadend = () => {
		setThumbImage(reader.result);
		setLoading(false); // End loading status
	};

	// Return text if image loading
	if (loading)
		return <Typography variant="subtitle1">Image Loading...</Typography>;
	// Return thumnail
	return (
		<div style={{ width: "min-content", position: "relative" }}>
			<img
				src={thumbImage}
				alt={props.file.name}
				style={{ maxHeight: 300, width: "auto" }}
			></img>
			<button
				onClick={function () {
					// Deletes image
					props.deleteFile();
				}}
				type="button"
				style={{
					border: 0,
					padding: "3px",
					background: "#2196f3",
					color: "white",
					position: "absolute",
					top: 0,
					right: 0,
				}}
			>
				<Typography>Delete Image</Typography>
			</button>
			<div
				style={{
					border: 0,
					padding: "3px",
					position: "absolute",
					bottom: 0,
					left: 0,
					background: "#2196f3",
					color: "white",
				}}
			>
				<Typography>{props.file.name}</Typography>
			</div>
		</div>
	);
}

export default CreatePost;
