import React from "react";
import { useState } from "react";

import { Formik } from "formik";
import * as yup from "yup";
import { Stack, Button } from "@mui/material";
import FormikTextInput from "../components/FormikTextInput";

/*
title: values.title,
body: values.body,
fileName: values.file.name,
type: values.file.type,
size: `${values.file.size} bytes`,
*/

const FileUpload = (props) => {
	function submitData(values) {}

	const [showUpload, setShowUpload] = useState(false); //defines if imageUpload should be hidden

	return (
		<div className="container">
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
								<Button variant="outlined" type="submit">
									Submit
								</Button>
							</Stack>
						</form>
					);
				}}
			</Formik>
		</div>
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

export default FileUpload;