import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({
	name,
	placeholder,
	value,
	error,
	icon,
	type,
	onChange
}) => {
    return (
		<div className="input-group relative mb-4">
			<input
				name={name}
				className="transition focus:outline-0 border border-transparent focus:bg-white focus:border-grey-light placeholder-grey-darkest rounded bg-grey-lighter py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input"
				value={value}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
			/>
			<div className="pointer-events-none absolute pin-y pin-l pl-3 flex items-center z-10">
				<i className={`text-grey-dark w-4 h-4 text-center ${icon}`} />
			</div>
			{error && (
				<p className="invalid-message">{error}</p>
			)}
		</div>
    );
};

InputGroup.displayName = 'InputGroup';

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	icon: PropTypes.string,
	type: PropTypes.string.isRequired,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  	type: 'text'
}

export default InputGroup;
