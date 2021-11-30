import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const FormikTextInput = ({ name, ...otherProps }) => {
	const [field, mata] = useField(name);

	const configTextfield = {
		...field,
		...otherProps,
		variant: "outlined",
	};

	if (mata && mata.touched && mata.error) {
		configTextfield.error = true;
		configTextfield.helperText = mata.error;
	}

	return <TextField {...configTextfield} />;
};

export default FormikTextInput;
