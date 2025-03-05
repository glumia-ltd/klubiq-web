/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useMemo, useRef, useState } from 'react';

// Extend the Window interface to include google
declare global {
	interface Window {
		google: any;
	}
}
import { PlaceType } from '../../shared/type';
import { loadScript } from '../../helpers/loadScript';
import { debounce } from '@mui/material/utils';
import Autocomplete from '@mui/material/Autocomplete';

import ControlledTextField from '../ControlledComponents/ControlledTextField';
import { getIn } from 'formik';
import { filter, find, includes, map } from 'lodash';
import countriesList from '../../helpers/countries-meta.json';

const autocompleteService = { current: null };
const countries = map(
	filter(countriesList, (item) => item.active),
	(item) => item.code.toLocaleLowerCase(),
);

export const AutoComplete: FC<{
	formik: any;
	name: string;
	label: string;
	required?: boolean;
}> = ({ formik, name, label, required }) => {
	const searchoptions = {
		componentRestrictions: { country: countries },
		fields: ['address_components', 'geometry', 'icon', 'name'],
		types: ['address', 'geocode'],
	};

	const [value, setValue] = useState<PlaceType | null>(null);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState<readonly PlaceType[]>([]);
	const loaded = useRef(false);

	// Load Google Maps script only once
	useEffect(() => {
		if (typeof window !== 'undefined' && !loaded.current) {
			if (!document.querySelector('#google-maps')) {
				loadScript(
					`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&libraries=places`,
					document.querySelector('head'),
					'google-maps',
				);
			}
			loaded.current = true;
		}
	}, []);

	const placesService = useRef<any>(null);

	// Function to get place details using placeId
	const getPlaceDetails = (placeId: string) => {
		if (!placesService.current && window.google) {
			placesService.current = new window.google.maps.places.PlacesService(
				document.createElement('div'),
			);
		}

		const request = {
			placeId,
			fields: ['name', 'formatted_address', 'address_component', 'geometry'],
		};

		placesService.current.getDetails(request, (place: any, status: any) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				const { address_components, geometry } = place;

				const city = find(address_components, (item) =>
					includes(item.types, 'locality'),
				)?.long_name;

				const state = find(address_components, (item) =>
					includes(item.types, 'administrative_area_level_1'),
				)?.long_name;

				const country = find(address_components, (item) =>
					includes(item.types, 'country'),
				)?.long_name;
				const postalCode = find(address_components, (item) =>
					includes(item.types, 'postal_code'),
				)?.long_name;

				const latitude = geometry.location.lat().toFixed(5);
				const longitude = geometry.location.lng().toFixed(5);

				formik.setValues({
					...formik.values,
					address: {
						...formik.values.address,
						city,
						state,
						country,
						postalCode,
						latitude,
						longitude,
					},
				});
			} else {
				console.error('Error retrieving place details:', status);
			}
		});
	};

	const fetch = useMemo(
		() =>
			debounce(
				(
					request: {
						input: string;
						componentRestrictions: { country: string[] };
						locationBias: string;
						offset: number;
					},
					callback: (results?: readonly PlaceType[]) => void,
				) => {
					(autocompleteService.current as any).getPlacePredictions(
						request,
						callback,
					);
				},
				400,
			),
		[],
	);

	useEffect(() => {
		let active = true;

		if (!autocompleteService.current && (window as any).google) {
			autocompleteService.current = new (
				window as any
			).google.maps.places.AutocompleteService();
		}

		if (!autocompleteService.current) {
			return undefined;
		}

		if (inputValue === '') {
			setOptions(value ? [value] : []);
			return undefined;
		}

		const removeCountryAndCityFromDescription = (description: string) => {
			const parts = description.split(',');
			return parts.slice(0, -2).join(',');
		};

		fetch(
			{
				input: inputValue,
				componentRestrictions: searchoptions.componentRestrictions,
				locationBias: 'IP_BIAS',
				offset: 3,
			},
			(results?: readonly PlaceType[]) => {
				if (active) {
					let newOptions: readonly PlaceType[] = [];

					if (value) {
						newOptions = [value];
					}

					if (results) {
						newOptions = [
							...newOptions,
							...results.map((option) => ({
								...option,
								description: removeCountryAndCityFromDescription(
									option.description,
								),
							})),
						];
					}

					setOptions(newOptions);

					if (results && results.length > 0 && !value) {
						const placeId = results[0]?.place_id;
						getPlaceDetails(placeId!);
					}
				}
			},
		);

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	const fieldValue = getIn(formik.values, name);

	return (
		<Autocomplete
			sx={{ width: '100%' }}
			freeSolo
			getOptionLabel={(option) =>
				option && typeof option === 'string'
					? option
					: option.description
						? option.description
						: ''
			}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value || fieldValue || ''}
			noOptionsText='No locations'
			onChange={(_event: any, value: PlaceType | null) => {
				setValue(value);

				if (typeof value === 'string') {
					formik.setFieldValue(name, value);
					formik.setFieldValue('address.isManualAddress', true);
				} else if (value) {
					formik.setFieldValue(name, value.description);
					formik.setFieldValue('address.isManualAddress', false);
				} else {
					formik.setFieldValue(name, '');
					formik.setFieldValue('address.city', '');
					formik.setFieldValue('address.country', '');
					formik.setFieldValue('address.state', '');
					formik.setFieldValue('address.postalCode', '');
				}
			}}
			onInputChange={(_event, newInputValue) => {
				if (!newInputValue) {
					formik.setFieldValue(name, newInputValue);
				}
				setInputValue(newInputValue);
			}}
			renderOption={(props, option, index) => {
				if (!option.description) {
					return;
				}
				return (
					<li
						{...props}
						key={`${option?.description}-${option?.place_id}-${index?.index}`}
					>
						{option?.description || option}
					</li>
				);
			}}
			renderInput={(params) => (
				<ControlledTextField
					required={required}
					name={name}
					label={label}
					formik={formik}
					{...params}
				/>
			)}
		/>
	);
};
