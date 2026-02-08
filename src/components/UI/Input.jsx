export default function Input({id, label, resetError, ...props}) {
	return <div className="control">
		<label htmlFor={id}>{label}</label>
		<input id={id} {...props} required onChange={resetError}/>
	</div>
}