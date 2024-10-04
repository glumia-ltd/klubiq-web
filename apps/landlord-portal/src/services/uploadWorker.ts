/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { each } from 'lodash';
import { getData, addData } from './indexedDb';

console.log('this is the service worker');

self.onmessage = async (event: MessageEvent) => {
	const { files, apiKey, timestamp, signature, folder, cloudName } = event.data;
	console.log('Message Received files:', files);
	// Cloudinary upload URL and preset
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
	const formData = new FormData();
	const idbKey = 'images';
	const idbStore = 'new-property';
	const uploadedImages = (await getData(idbKey, idbStore)) || {
		key: idbKey,
		value: [],
	};
	// eslint-disable-next-line no-undef
	// let timeoutId: string | number | NodeJS.Timeout | undefined;

	each(files, async (file, idx) => {
		formData.append('file', file);
		formData.append('api_key', apiKey);
		formData.append('timestamp', `${timestamp}`);
		formData.append('signature', signature);
		formData.append('folder', folder);
		try {
			postMessage({ status: 'uploading' });

			const response = await fetch(url, {
				method: 'POST',
				body: formData,
			});
			const data = await response.json();
			console.log('Uploaded to Cloudinary:', data);
			uploadedImages.value.push({
				externalId: data.public_id,
				isMain: Number(idx) === 0,
				url: data.secure_url,
				fileSize: data.bytes,
				fileName: data.original_filename,
			});
		} catch (error) {
			console.error('Error uploading:', error);
			console.error('Error uploading:', error);
			postMessage({ status: 'error', error });
		}
		addData(uploadedImages, idbStore);
		postMessage({ status: 'success', data: uploadedImages });
	});

	//clearTimeout(timeoutId);
};

export default null as any;
