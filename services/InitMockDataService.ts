import { AGENT_KEYS } from "@/constants/agents-data";
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
			[AGENT_KEYS.wendy]: {
				dialog: [],
				id: AGENT_KEYS.wendy,
				name: "",
				createTime: 1753381996889,
				lastReplyTime: 0,
				cost: 10,
			},
			[AGENT_KEYS.ashley]: {
				dialog: [],
				id: AGENT_KEYS.ashley,
				name: "",
				createTime: 1753381996889,
				lastReplyTime: 0,
				cost: 25,
			},
			[AGENT_KEYS.jane]: {
				dialog: [],
				id: AGENT_KEYS.jane,
				name: "",
				createTime: 1753381996889,
				lastReplyTime: 0,
				cost: 10,
			},
			[AGENT_KEYS.elise]: {
				dialog: [],
				id: AGENT_KEYS.elise,
				name: "",
				createTime: 1753381996889,
				lastReplyTime: 0,
				cost: 10,
			},
			[AGENT_KEYS.dakota]: {
				dialog: [],
				id: AGENT_KEYS.dakota,
				name: "",
				createTime: 1753381996889,
				lastReplyTime: 0,
				cost: 10,
			},
			[AGENT_KEYS.lumi]: {
				dialog: [],
				id: AGENT_KEYS.lumi,
				name: "",
				createTime: 1753381996889,
				lastReplyTime: 0,
				cost: 10,
			},
			[AGENT_KEYS.yumi]: {
				dialog: [],
				id: AGENT_KEYS.yumi,
				name: "",
				createTime: 1753381996889,
				lastReplyTime: 0,
				cost: 10,
			},
			[AGENT_KEYS.lola]: {
				dialog: [],
				id: AGENT_KEYS.lola,
				name: "",
				createTime: 1753381996889,
				lastReplyTime: 0,
				cost: 10,
			}
		}))
	}
}