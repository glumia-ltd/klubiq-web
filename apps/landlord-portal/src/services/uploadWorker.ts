/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { each } from 'lodash';
import { getData, addData } from './indexedDb';
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
	let timeoutId: string | number | NodeJS.Timeout | undefined;
	timeoutId = setTimeout(() => {
		each(files, async (file, idx) => {
			formData.append('file', file);
			formData.append('api_key', apiKey);
			formData.append('timestamp', `${timestamp}`);
			formData.append('signature', signature);
			formData.append('folder', folder);
			try {
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
	}, 5000);
	//clearTimeout(timeoutId);
	postMessage({ status: 'uploading', data: timeoutId });
};

export default null as any;
