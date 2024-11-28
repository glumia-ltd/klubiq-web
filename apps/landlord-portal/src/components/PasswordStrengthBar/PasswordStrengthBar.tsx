import { FC, useEffect } from 'react';
import { styles } from './style';

export const PasswordStrengthBar: FC<{
	password: string;
	handlePasswordChange: (message: string) => void;
}> = ({ password, handlePasswordChange }) => {
	const lengthIsGreaterThanEigth = password.length >= 8;
	const thereIsALowerCase = password.match(/[a-z]+/);
	const thereIsAnUpperCase = password.match(/[A-Z]+/);
	const thereIsASpecialSymbol = password.match(/[^a-zA-Z0-9]+/);
	const thereIsANumber = password.match(/[0-9]/);

	const calculatePasswordStrength = () => {
		let strength = 0;

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

	useEffect(() => {
		let message = '';

		if (password.length <= 0) {
			message = '';
			handlePasswordChange(message);
			return;
		}

		if (!lengthIsGreaterThanEigth) {
			message = `Password must be at least 8 characters long.`;
		} else if (!thereIsALowerCase) {
			message = 'Password must include at least one lowercase letter.';
		} else if (!thereIsAnUpperCase) {
			message = 'Password must include at least one uppercase letter.';
		} else if (!thereIsASpecialSymbol) {
			message =
				'Password must include at least one special character (e.g., @, #, $, &).';
		}

		handlePasswordChange(message);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [password]);

	const strength = calculatePasswordStrength();
	const strengthBarColor = getStrengthByColor(strength);

	const strengthBarStyle = {
		width: `${(strength / 5) * 100}%`,
		backgroundColor: strengthBarColor,
		filter: strength > 0 ? `drop-shadow(0 0 5px ${strengthBarColor})` : 'none',
	};

	return <div style={{ ...styles.strengthBar, ...strengthBarStyle }}></div>;
};
