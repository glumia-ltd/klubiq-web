import { openDB } from 'idb';

const dbName = 'klubiq-landlord-portal';

const initDB = async () => {
	return await openDB(dbName, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('store')) {
				db.createObjectStore('store', {
					keyPath: 'id',
				});
			}
		},
	});
};
// Add data to the store
export const addData = async (data: any) => {
	const db = await initDB();
	const tx = db.transaction('store', 'readwrite');
	tx.objectStore('store').put(data);
	await tx.done;
};

// Retrieve data from the store
export const getData = async (id: IDBKeyRange | IDBValidKey) => {
	const db = await initDB();
	return await db.get('store', id);
};
