import {
	AsyncStorageService
} from "@/services/AsyncStorageService";
import {
	LOCAL_STORAGE_KEYS
} from "./constants";

export class InitMockDataService {
	constructor() {
		this.init();
	}

	async init() {
		const isInit = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.IS_INIT);

		if (!isInit) {
			await this.setInitUserData();
			await this.setInitDialogs();
			await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.IS_INIT, 'true');
		}
	}

	async setInitUserData() {
		return await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify({
			userStatus: "basic",
			tokens: 10000,
			email: "default",
			accountLevel: "0",
			tokenVolume: 0,
			proAccountEndTime: "",
			settings: {
				assistantIdCurrent: "wendy",
				isHideSidebar: 0
			}
		}))
	}

	async setInitDialogs() {
		return await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.DIALOGS, JSON.stringify({
			"wendy": {
				"dialog": [],
				"id": "wendy",
				"name": "",
				"createTime": 1753381996889,
				"lastReplyTime": 0
			},
			"ashley": {
				"dialog": [],
				"id": "ashley",
				"name": "",
				"createTime": 1753381996889,
				"lastReplyTime": 0
			},
			"jane": {
				"dialog": [],
				"id": "jane",
				"name": "",
				"createTime": 1753381996889,
				"lastReplyTime": 0
			},
			"elise": {
				"dialog": [],
				"id": "elise",
				"name": "",
				"createTime": 1753381996889,
				"lastReplyTime": 0
			},
			"dakota": {
				"dialog": [],
				"id": "dakota",
				"name": "",
				"createTime": 1753381996889,
				"lastReplyTime": 0
			},
			"lumi": {
				"dialog": [],
				"id": "lumi",
				"name": "",
				"createTime": 1753381996889,
				"lastReplyTime": 0
			},
			"yumi": {
				"dialog": [],
				"id": "yumi",
				"name": "",
				"createTime": 1753381996889,
				"lastReplyTime": 0
			},
			"lola": {
				"dialog": [],
				"id": "lola",
				"name": "",
				"createTime": 1753381996889,
				"lastReplyTime": 0
			}
		}))
	}
}