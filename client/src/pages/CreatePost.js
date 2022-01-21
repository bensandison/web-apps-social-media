import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { Stack, Button, Typography, Container } from "@mui/material";
import FormikTextInput from "../components/FormikTextInput";

const CreatePost = (props) => {
	const [showUpload, setShowUpload] = useState(false); //defines if imageUpload should be hidden

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
								{
									//Conditional rendering:
									showUpload && (
										<div>
											<label htmlFor="file">File upload</label>
											<input
												id="file"
												name="file"
												type="file"
												onChange={(event) => {
													setFieldValue("file", event.currentTarget.files[0]);
												}}
											/>
											<Thumb file={values.file} />
										</div>
									)
								}
								{
									//Conditional rendering
									!showUpload && (
										<Button
											variant="outlined"
											onClick={() => {
												setShowUpload(true);
											}}
										>
											Add Image
										</Button>
									)
								}
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

// This component is used to display image thumbnails:
class Thumb extends React.Component {
	state = {
		loading: false,
		thumb: undefined,
	};

	componentWillReceiveProps(nextProps) {
		if (!nextProps.file) {
			return;
		}

		this.setState({ loading: true }, () => {
			let reader = new FileReader();

			reader.onloadend = () => {
				this.setState({ loading: false, thumb: reader.result });
			};

			reader.readAsDataURL(nextProps.file);
		});
	}

	render() {
		const { file } = this.props;
		const { loading, thumb } = this.state;

		if (!file) {
			return null;
		}

		if (loading) {
			return <p>loading...</p>;
		}

		return (
			<img
				src={thumb}
				alt={file.name}
				className="img-thumbnail mt-2"
				height={200}
				width={200}
			/>
		);
	}
}

export default CreatePost;
