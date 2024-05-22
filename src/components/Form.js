import React, { useState } from 'react';

const EVForm = () => {
	const [customerNumber, setCustomerNumber] = useState('');
	const [postalCode, setPostalCode] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch('/wp-json/custom/v1/submit-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ customerNumber, postalCode }),
			});

			const data = await response.json();

			if (data.success) {
				alert('Form submitted successfully!');
			} else {
				alert('There was an error: ' + data.message);
			}
		} catch (error) {
			alert('There was an error submitting the form.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				name='customerNumber'
				placeholder='Customer Number'
				value={customerNumber}
				onChange={(e) => setCustomerNumber(e.target.value)}
				required
			/>
			<input
				type='text'
				name='postalCode'
				placeholder='Postal Code'
				value={postalCode}
				onChange={(e) => setPostalCode(e.target.value)}
				required
			/>
			<button type='submit'>Submit</button>
		</form>
	);
};

export default EVForm;
