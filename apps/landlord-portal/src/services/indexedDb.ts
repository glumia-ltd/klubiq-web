/* eslint-disable no-undef */
import { openDB } from 'idb';
import { each } from 'lodash';

const dbName = 'KlubiqIDB';
const stores = ['client-config', 'new-property'];
const dbVersion = Number(import.meta.env.VITE_IDB_VERSION) || 1;
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

export const initDB = async () => {
	const db = await openDB(dbName, dbVersion, {
		upgrade(db) {
			each(stores, (store) => {
				if (!db.objectStoreNames.contains(store)) {
					// console.log('Creating object store:', store);
					db.createObjectStore(store, {
						keyPath: 'key',
					});
				}
			});
		},
	});
	db.onversionchange = (event) => {
		// console.log('Database version change:', event);
		db.close();
		//initDB(event.newVersion);
	};
	return db;
};

// Add data to the store
export const addData = async (data: Data, storeName: string) => {
	const db = await openDB(dbName);
	if (!db || !db.objectStoreNames.contains(storeName)) return null;
	const tx = db.transaction(storeName, 'readwrite');
	tx.objectStore(storeName).put(data);
	await tx.done;
};

// Retrieve data from the store
export const getData = async (
	key: IDBKeyRange | IDBValidKey,
	storeName: string,
) => {
	const db = await initDB();
	if (!db || !db.objectStoreNames.contains(storeName)) return null;
	return await db.get(storeName, key);
};

export const getAllData = async (storeName: string) => {
	const db = await initDB();
	return await db.getAll(storeName);
};
export const deleteData = async (
	key: IDBKeyRange | IDBValidKey,
	storeName: string,
) => {
	const db = await openDB(dbName);
	if (db && db.objectStoreNames.contains(storeName)) {
		await db.delete(storeName, key);
	}
};
export const clearData = async (storeName: string) => {
	const db = await openDB(dbName);
	if (db && db.objectStoreNames.contains(storeName)) {
		await db.clear(storeName);
	}
};
