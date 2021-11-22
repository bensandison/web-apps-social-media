import { Formik, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import FormikTextInput from "../components/FormikTextInput";

// And now we can use these
function SignUpForm() {
	return (
		<div className="max-w-lg mx-auto shadow-2xl p-5">
			<Formik
				initialValues={{
					name: "",
					email: "",
					password: "",
				}}
				validationSchema={Yup.object({
					name: Yup.string()
						.required("Username Required")
						.max(15, "15 characters or less required"),
					email: Yup.string()
						.required("Email Required")
						.email("Invalid email address"),
					password: Yup.string()
						.required("Password Required")
						.min(8, "8 characters or more required")
						.max(30, "30 characters or less required"),
				})}
				onSubmit={(values, { setSubmitting }) => {
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
				}}
			>
				<Form noValidate className="flex flex-col items-center">
					<h1 className="text-2xl font-bold">Sign Up:</h1>
					<FormikTextInput label="User Name:" name="name" type="text" />
					<FormikTextInput label="Email Adress:" name="email" type="text" />
					<FormikTextInput label="Password" name="password" type="text" />
					<button
						type="submit"
						className="m-2 p-2 border-2 border-gray-500 font-bold"
					>
						Submit
					</button>
				</Form>
			</Formik>
		</div>
	);
}

export default SignUpForm;
