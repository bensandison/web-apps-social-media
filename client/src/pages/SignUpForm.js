import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikTextInput from "../components/FormikTextInput";

// And now we can use these
function SignUpForm() {
	return (
		<div className="max-w-lg mx-auto shadow-2xl p-5">
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
				}}
				validationSchema={Yup.object({
					firstName: Yup.string()
						.max(15, "Must be 15 characters or less")
						.required("Required"),
					lastName: Yup.string()
						.max(20, "Must be 20 characters or less")
						.required("Required"),
					email: Yup.string()
						.email("Invalid email address")
						.required("Required"),
				})}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
				}}
			>
				<Form noValidate className="flex flex-col items-center">
					<h1 className="text-2xl font-bold">Sign Up:</h1>
					<FormikTextInput
						label="First Name:"
						name="firstName"
						type="text"
						placeholder="Jane"
					/>

					<FormikTextInput
						label="Last Name:"
						name="lastName"
						type="text"
						placeholder="Doe"
					/>

					<FormikTextInput
						label="Email Address:"
						name="email"
						type="email"
						placeholder="jane@formik.com"
					/>

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
