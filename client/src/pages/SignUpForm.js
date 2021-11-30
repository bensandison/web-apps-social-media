import { Formik, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import FormikTextInput from "../components/FormikTextInput";
import { Button } from "@material-ui/core";

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

function submitData(values, setSubmitting) {
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
		setSubmitting(false);
	}, 400);
}

// And now we can use these
function SignUpForm() {
	return (
		<Formik
			initialValues={{ ...initialFormState }}
			validationSchema={yupSchema}
			onSubmit={(values) => {
				console.log(values);
			}}
		>
			<Form>
				<FormikTextInput name="name" label="User Name:" />
				<FormikTextInput name="email" label="Email Adress:" />
				<FormikTextInput name="password" label="Password:" />
				<Button type="submit">Submit</Button>
			</Form>
		</Formik>
	);
}

export default SignUpForm;
