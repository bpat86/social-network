import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disabled
}) => {
    return (
		<div className="form-group my-6">
			<input
				type={type}
				className={classnames('block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey', {'is-invalid': error})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
				/>
			{error && <span className="invalid-message">{error}</span>}
			{info && <span className="block py-3 font-medium text-xs leading-normal text-grey-darker">{info}</span>}
		</div>
    );
};

TextFieldGroup.displayName = 'TextFieldGroup';

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  	type: 'text'
}

export default TextFieldGroup;
