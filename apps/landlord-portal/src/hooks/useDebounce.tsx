import { debounce } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';

export const useDebounce = (callback: any, wait: number) => {
	const ref = useRef<any>();

	useEffect(() => {
		ref.current = callback;
	}, [callback]);

	const debouncedCallback = useMemo(() => {
		const debounceCallback = () => {
			ref.current?.();
		};

		return debounce(debounceCallback, wait);
	}, []);

	return debouncedCallback;
};
