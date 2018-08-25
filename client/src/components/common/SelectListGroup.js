import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SelectListGroup = ({
	name,
	value,
	error,
	info,
	onChange,
	options
}) => {
	const selectOptions = options.map(option => (
		<option key={option.label} value={option.value}>{option.label}</option>
	));

    return (
		<div className="form-group mb-4">
			<div className="relative">
				<select
					className={classnames('block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey', {'is-invalid': error})}
					name={name}
					value={value}
					onChange={onChange}
				>
					{selectOptions}
				</select>
				<div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
		          	<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
		       	</div>
	       	</div>
			{error && <span className="invalid-message">{error}</span>}
			{info && <span className="block py-3 text-xs text-grey-darker">{info}</span>}
		</div>
    );
};

SelectListGroup.displayName = 'SelectListGroup';

SelectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired
};

export default SelectListGroup;
