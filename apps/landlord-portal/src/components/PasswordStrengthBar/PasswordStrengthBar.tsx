import { FC } from 'react';
import { styles } from './style';

export const PasswordStrengthBar: FC<{ password: string }> = ({ password }) => {
	const calculatePasswordStrength = () => {
		let strength = 0;

		const lengthIsGreaterThanEigth = password.length >= 8;
		const thereIsALowerCase = password.match(/[a-z]+/);
		const thereIsAnUpperCase = password.match(/[A-Z]+/);
		const thereIsASpecialSymbol = password.match(/[^a-zA-Z0-9]+/);
		const thereIsANumber = password.match(/[0-9]/);

		if (
			lengthIsGreaterThanEigth &&
			thereIsALowerCase &&
			thereIsAnUpperCase &&
			thereIsASpecialSymbol
		) {
			strength += 1;
		}
		if (thereIsALowerCase) {
			strength += 1;
		}
		if (thereIsAnUpperCase) {
			strength += 1;
		}
		if (thereIsASpecialSymbol) {
			strength += 1;
		}

		if (thereIsANumber) {
			strength += 1;
		}
		return strength;
	};

	const getStrengthByColor = (strength: number) => {
		switch (strength) {
			case 1:
				return 'red';
			case 2:
				return 'orange';
			case 3:
				return 'yellow';
			case 4:
				return 'lightblue';
			case 5:
				return 'lightgreen';
			default:
				return 'gray';
		}
	};

	const strength = calculatePasswordStrength();
	const strengthBarColor = getStrengthByColor(strength);

	console.log(strength, strengthBarColor);

	const strengthBarStyle = {
		width: `${(strength / 5) * 100}%`,
		backgroundColor: strengthBarColor,
		filter: strength > 0 ? `drop-shadow(0 0 5px ${strengthBarColor})` : 'none',
	};

	return <div style={{ ...styles.strengthBar, ...strengthBarStyle }}></div>;
};
