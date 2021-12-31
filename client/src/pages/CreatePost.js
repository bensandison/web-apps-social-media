import { Formik, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import FormikTextInput from "../components/FormikTextInput";
import { Button, Container, Stack, Typography } from "@mui/material";

const initialFormState = {
	title: "",
	body: "",
};

const yupSchema = Yup.object({
	title: Yup.string().required("Post title required"),
	body: Yup.string().required("Post body required"),
});

function submitData(values) {
	setTimeout(() => {
		Axios.post("/api/posts", values)
			.then((response) => {
				console.log(response);
			})
			.catch(function (error) {
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
		// setSubmitting(false);
	}, 400);
}

// And now we can use these
function CreatePost() {
	return (
		<Container maxWidth="xs" padding={2}>
			<Typography variant="h4">Create Post:</Typography>
			<Formik
				initialValues={{ ...initialFormState }}
				validationSchema={yupSchema}
				onSubmit={(values) => {
					submitData(values);
				}}
			>
				<Form>
					<Stack spacing={2}>
						<FormikTextInput name="title" label="Post Title:" />
						<FormikTextInput
							name="body"
							label="Post Body:"
							multiline
							rows={5}
							maxRows={20}
						/>
						<Button variant="contained" type="submit">
							Submit
						</Button>
					</Stack>
				</Form>
			</Formik>
		</Container>
	);
}

export default CreatePost;
