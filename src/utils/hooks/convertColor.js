import React, { useEffect, useState } from 'react';

const convertColor = (color) => {
	const [hexColor, setHexColor] = useState();

	useEffect(() => {
		switch (color) {
			case 'red':
				setHexColor('#802119');
			case 'blue':
				setHexColor('#434D59');
			case 'green':
				setHexColor('#556D54');
			case 'brown':
				setHexColor('#746756');
			case 'tan':
				setHexColor('#C1A98B');
			default:
				console.error("Color wasn't found in convert Color.js");
		}
	}, []);

	return { hexColor };
};

export default convertColor;
