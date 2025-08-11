import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_KEYS } from './constants';

export class AsyncStorageService {
	static async storeData(key: LOCAL_STORAGE_KEYS, value: string) {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (e) {
			console.error('Error save:', e);
		}
	}

	static async storeDataBySubKey(
		key: LOCAL_STORAGE_KEYS,
		subKey: LOCAL_STORAGE_KEYS,
		value: unknown,
	) {
		try {
			const dataStr = await AsyncStorageService.getData(key);
			const data = dataStr ? JSON.parse(dataStr) : {};
			data[subKey] = value;

			await AsyncStorageService.storeData(key, JSON.stringify(data))
		} catch (e) {
			console.error('Error save:', e);
		}
	}

	static async getData(key: LOCAL_STORAGE_KEYS) {
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null) {
				return value;
			}
		} catch (e) {
			console.error('Error getting:', e);
		}
	}

	static async removeData(key: LOCAL_STORAGE_KEYS) {
		try {
			await AsyncStorage.removeItem(key);
		} catch (e) {
			console.error('Error remove:', e);
		}
	}
}
