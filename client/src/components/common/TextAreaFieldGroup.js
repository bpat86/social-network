import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextAreaFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	onChange
}) => {
    return (
		<div className="form-group mb-4">
			<textarea
				className={classnames('block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey min-h-24 resize-y', {'is-invalid': error})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				/>
			{error && <span className="invalid-message">{error}</span>}
			{info && <span className="block py-3 text-xs text-grey-darker">{info}</span>}
		</div>
    );
};

TextAreaFieldGroup.displayName = 'TextAreaFieldGroup';

TextAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
