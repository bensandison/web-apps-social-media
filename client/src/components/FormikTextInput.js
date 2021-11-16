import { useField } from "formik";

function FormikTextInput(props) {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input>. We can use field meta to show an error
	// message if the field is invalid and it has been touched (i.e. visited)
	const [field, meta] = useField(props);

	return (
		<div className="my-1 w-full max-w-sm font-bold">
			<div className="flex justify-between">
				<label htmlFor={props.id || props.name}>{props.label}</label>
				{meta.touched && meta.error ? (
					<div className="text-red-600">{meta.error}</div>
				) : null}
			</div>
			<input
				className="w-full border-2 border-gray-500 py-1 px-2"
				{...field}
				{...props}
			/>
		</div>
	);
}

export default FormikTextInput;
