import React from 'react';
import spinner from './spinner.svg';

const Spinner = ({ className }) => {
    return (
		<div className="flex justify-center items-center">
			<img
				className="w-8 h-8"
				src={spinner}
				alt="Loading..."
			/>
		</div>
    );
};

export default Spinner;
