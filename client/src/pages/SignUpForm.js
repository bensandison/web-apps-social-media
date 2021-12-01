import { Formik, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import FormikTextInput from "../components/FormikTextInput";
import { Button, Container, Stack, Typography } from "@mui/material";

const initialFormState = {
	name: "",
	email: "",
	password: "",
};

const yupSchema = Yup.object({
	name: Yup.string()
		.required("Username Required")
		.max(15, "15 characters or less required"),
	email: Yup.string().required("Email Required").email("Invalid email address"),
	password: Yup.string()
		.required("Password Required")
		.min(8, "8 characters or more required")
		.max(30, "30 characters or less required"),
});

function submitData(values) {
	setTimeout(() => {
		Axios.post("/api/users", values)
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
function SignUpForm() {
	return (
		<Container maxWidth="xs" padding={2}>
			<Typography variant="h4">Sign Up:</Typography>
			<Formik
				initialValues={{ ...initialFormState }}
				validationSchema={yupSchema}
				onSubmit={(values) => {
					submitData(values);
				}}
			>
				<Form>
					<Stack spacing={2}>
						<FormikTextInput name="name" label="User Name:" />
						<FormikTextInput name="email" label="Email Adress:" />
						<FormikTextInput name="password" label="Password:" />
						<Button type="submit">Submit</Button>
					</Stack>
				</Form>
			</Formik>
		</Container>
	);
}

export default SignUpForm;
