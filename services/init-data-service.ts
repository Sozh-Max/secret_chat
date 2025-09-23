import { AGENT_KEYS } from "@/constants/agents-data";
import {
	AsyncStorageService
} from "@/services/async-storage-service";
import {
	LOCAL_STORAGE_KEYS
} from "./constants";
import { api } from '@/api/api';
import { IDialog } from '@/contexts/GlobalContext';

export class InitDataService {
	private readonly userId: string;
	constructor({ userId }: { userId: string }) {
		this.userId = userId;
		this.init();
	}

	async init() {
		const isInit = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.IS_INIT);

		if (!isInit) {
			await this.setInitDialogs();
			// await this.setInitUserData();
			await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.IS_INIT, 'true');
		}
	}

	// async setInitUserData() {
	// 	const request = await api.getBalance(this.userId);
	//
	// 	if (request.ok) {
	// 		const requestData = await request.json();
	//
	// 		return await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify({
	// 			userStatus: "basic",
	// 			tokens: Number(requestData.balance),
	// 			email: "default",
	// 			accountLevel: "0",
	// 			tokenVolume: 0,
	// 			proAccountEndTime: "",
	// 		}));
	// 	}
	// }

	async setInitDialogs() {

		const request = await api.getInitData(this.userId);
		if (request.ok) {
			const requestData = await request.json();
			const data: Partial<Record<AGENT_KEYS, IDialog>> = {};

			for (const key in requestData?.assistantsData) {
				const obj = requestData.assistantsData[key];

				// @ts-ignore
				data[key] = {
					dialog: [],
					id: key as AGENT_KEYS,
					cost: obj.cost ?? 10,
					isBlocked: false,
					isComplaint: false,
					hasVideo: Boolean(obj.vid_count),
					description: obj.description ?? '',
				}
			}

			return await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.DIALOGS, JSON.stringify(data));
		}

	}
}