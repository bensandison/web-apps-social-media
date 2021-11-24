import { useField } from "formik";

function FormikTextInput(props) {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input>. We can use field meta to show an error
	// message if the field is invalid and it has been touched (i.e. visited)
	const [field, meta] = useField(props);

	return (
		<div>
			<div>
				<label htmlFor={props.id || props.name}>{props.label}</label>
				{meta.touched && meta.error ? (
					<div>{meta.error}</div>
				) : null}
			</div>
			<input
				{...field}
				{...props}
			/>
		</div>
	);
}

export default FormikTextInput;
