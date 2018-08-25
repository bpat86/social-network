import React from 'react';
import spinner from './spinner.svg';

const Spinner = ({ className }) => {
    return (
		<div>
			<img
				className="inline-block w-8 h-8"
				src={spinner}
				alt="Loading..."
			/>
		</div>
    );
};

export default Spinner;
