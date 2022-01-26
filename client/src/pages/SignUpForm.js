import { Formik, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";
import FormikTextInput from "../components/FormikTextInput";
import { Button, Container, Stack, Typography } from "@mui/material";
import axiosError from "../utils/axiosError";
import { Navigate } from "react-router-dom";
import { useState } from "react";

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

function submitSignup(values, success) {
	setTimeout(() => {
		Axios.post("/api/users", values)
			.then((response) => {
				success();
			})
			.catch(function (error) {
				axiosError(error);
			});
	}, 400);
}

function submitLogin(values, success) {
	setTimeout(() => {
		Axios.post("/api/session", values)
			.then((response) => {
				console.log(response);
				success();
			})
			.catch((error) => {
				axiosError(error);
			});
	}, 400);
}

// And now we can use these
function SignUpForm() {
	const [signedUp, setSignedUp] = useState(false);
	// Once user has logged in go to timeline
	if (signedUp) return <Navigate to="/timeline" />;

	return (
		<Container maxWidth="xs">
			<Formik
				initialValues={{ ...initialFormState }}
				validationSchema={yupSchema}
				onSubmit={(values) => {
					submitSignup(values, () => {
						// Callback fn called on signup sucess:
						submitLogin(values, () => {
							setSignedUp(true);
						});
					});
				}}
			>
				<Form>
					<Stack spacing={2}>
						<Typography variant="h4">Sign Up:</Typography>
						<FormikTextInput name="name" label="User Name:" />
						<FormikTextInput name="email" label="Email Adress:" />
						<FormikTextInput name="password" label="Password:" />
						<Button variant="contained" type="submit">
							Submit
						</Button>
					</Stack>
				</Form>
			</Formik>
		</Container>
	);
}

export default SignUpForm;
