import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { Stack, Button, Typography, Container } from "@mui/material";
import FormikTextInput from "../components/FormikTextInput";

const CreatePost = (props) => {
	function submitData(values) {
		// Use multipart form data:
		const formData = new FormData();
		formData.append("title", values.title);
		formData.append("body", values.body);
		formData.append("image", values.file);

		setTimeout(() => {
			Axios.post("/api/posts", formData)
				.then((response) => {
					console.log(response);
				})
				.catch(function (error) {
					//Error handling:
					if (error.response) {
						// Request made and server responded
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						// The request was made but no response was received
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log("Error", error.message);
					}
				});
		}, 400);
	}

	return (
		<Container maxWidth="sm">
			<Formik
				initialValues={{
					title: "",
					body: "",
					file: null,
				}}
				onSubmit={(values) => {
					submitData(values);
				}}
				// Title and body are required
				validationSchema={yup.object().shape({
					title: yup.string().required("Post title required"),
					body: yup.string().required("Post body required"),
					file: yup.mixed(),
				})}
			>
				{({ values, handleSubmit, setFieldValue }) => {
					return (
						<form onSubmit={handleSubmit}>
							<Stack spacing={2}>
								<Typography variant="h4">Create Post</Typography>
								<FormikTextInput name="title" label="Post Title:" />
								<FormikTextInput
									name="body"
									label="Post Body:"
									multiline
									minRows={5}
									maxRows={20}
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
									<Thumbnail file={values.file} />
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
		setLoading(false);
	};

	// Return text if image loading
	if (loading)
		return <Typography variant="subtitle1">Image Loading...</Typography>;
	return (
		<img src={thumbImage} alt={props.file.name} style={{ height: 200 }}></img>
	);
}

export default CreatePost;
