import { Formik, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import FormikTextInput from "../components/FormikTextInput";
import { Button, Container, Stack, Typography } from "@mui/material";

const initialFormState = {
	email: "",
	password: "",
};

const yupSchema = Yup.object({
	email: Yup.string().required("Email Required").email("Invalid email address"),
	password: Yup.string()
		.required("Password Required")
		.min(8, "8 characters or more required")
		.max(30, "30 characters or less required"),
});

function submitData(values) {
	setTimeout(() => {
		Axios.post("/api/session", values)
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
function LogInForm() {
	return (
		<Container maxWidth="xs" padding={2}>
			<Typography variant="h4">Log In:</Typography>
			<Formik
				initialValues={{ ...initialFormState }}
				validationSchema={yupSchema}
				onSubmit={(values) => {
					submitData(values);
				}}
			>
				<Form>
					<Stack spacing={2}>
						<FormikTextInput name="email" label="Email Adress:" />
						<FormikTextInput name="password" label="Password:" />
						<Button variant="contained" type="submit">Submit</Button>
					</Stack>
				</Form>
			</Formik>
		</Container>
	);
}

export default LogInForm;
