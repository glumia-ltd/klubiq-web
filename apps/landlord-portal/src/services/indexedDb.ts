/* eslint-disable no-undef */
import { openDB } from 'idb';

const dbName = 'KlubiqIDB';
type Data = {
	key: IDBKeyRange | IDBValidKey;
	value:
		| null
		| []
		| string
		| number
		| boolean
		| object
		| Date
		| Uint8Array
		| ArrayBuffer;
};

export const initDB = async (storeName: string) => {
	return await openDB(dbName, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, {
					keyPath: 'key',
				});
			}
		},
	});
};

// Add data to the store
export const addData = async (data: Data, storeName: string = 'properties') => {
	const db = await initDB(storeName);
	const tx = db.transaction(storeName, 'readwrite');
	tx.objectStore(storeName).put(data);
	await tx.done;
};

// Retrieve data from the store
export const getData = async (
	key: IDBKeyRange | IDBValidKey,
	storeName: string = 'properties',
) => {
	const db = await initDB(storeName);
	return await db.get(storeName, key);
};

export const getAllData = async (storeName: string = 'properties') => {
	const db = await initDB(storeName);
	return await db.getAll(storeName);
};
export const deleteData = async (
	key: IDBKeyRange | IDBValidKey,
	storeName: string = 'properties',
) => {
	const db = await openDB(dbName, 1);
	if (db && db.objectStoreNames.contains(storeName)) {
		await db.delete(storeName, key);
	}
};
export const clearData = async (storeName: string = 'properties') => {
	const db = await openDB(dbName, 1);
	if (db && db.objectStoreNames.contains(storeName)) {
		await db.clear(storeName);
	}
};
