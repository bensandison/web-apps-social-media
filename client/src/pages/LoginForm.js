import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

function MyTextInput(props) {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input>. We can use field meta to show an error
	// message if the field is invalid and it has been touched (i.e. visited)
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{props.label}</label>
			<input className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	);
}

// And now we can use these
function LoginForm() {
	return (
		<>
			<h1>Subscribe!</h1>
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
				<Form>
					<MyTextInput
						label="First Name"
						name="firstName"
						type="text"
						placeholder="Jane"
					/>

					<MyTextInput
						label="Last Name"
						name="lastName"
						type="text"
						placeholder="Doe"
					/>

					<MyTextInput
						label="Email Address"
						name="email"
						type="email"
						placeholder="jane@formik.com"
					/>

					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</>
	);
}

export default LoginForm;

/*
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikTextInput from "../components/FormikTextInput";

// And now we can use these
function LoginForm() {
	return (
		<>
			<h1>Login:</h1>
			<Formik
				formnovalidate
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					acceptedTerms: false, // added for our checkbox
					jobType: "", // added for our select
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
					acceptedTerms: Yup.boolean()
						.required("Required")
						.oneOf([true], "You must accept the terms and conditions."),
					jobType: Yup.string()
						.oneOf(
							["designer", "development", "product", "other"],
							"Invalid Job Type"
						)
						.required("Required"),
				})}
				onSubmit={(values, { setSubmitting }) => {
					console.log("hello?");
					setTimeout(() => {
						console.log(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
				}}
			>
				<Form>
					<FormikTextInput
						label="First Name"
						name="firstName"
						type="text"
						placeholder="Jane"
					/>

					<FormikTextInput
						label="Last Name"
						name="lastName"
						type="text"
						placeholder="Doe"
					/>

					<FormikTextInput
						label="Email Address"
						name="email"
						type="email"
						placeholder="jane@formik.com"
					/>

					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</>
	);
}

export default LoginForm;
*/
