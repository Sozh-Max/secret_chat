import { Base64 } from 'js-base64';

import { IMessagesRequest, IResponse, IResponseUserData } from '@/api/interfaces';
import { PLATFORM } from '@/services/constants';
import { IDialog } from '@/contexts/GlobalContext';
import { AGENT_KEYS } from '@/constants/agents-data';

const responseHandler = async (res: any) => {
  if (!res.ok) {
    return Error(`Network error: ${res.status} ${res.statusText}`);
  }

  const data =  await res.json();

  return data.data;
}

class Api {
  private link = 'https://app.neuronautica.com/api/v2';
  private linkStat = 'https://app.neuronautica.com/stats/save_db_apk.php';

  async auth(token: string, bootId: string): Promise<IResponseUserData> {
    return fetch(`${this.link}/app/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_token: token,
        mode: 'google',
        bootId,
      }),
    }).then(responseHandler);
  }


  sendAuthorizeByEmail(email: string) {
    return fetch(`${this.link}/app/code/send`, {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
    });
  }

  async checkAuthorizeByEmail(
    email: string,
    code: string | number,
    bootId: string,
  ): Promise<IResponseUserData> {
    return fetch(`${this.link}/app/code/check?email=${email}&code=${code}&bootId=${bootId}`, {
      method: 'GET',
    }).then(responseHandler)
  }

  getInitData = async (id: string) => {
    return fetch(`${this.link}/app/init?id=${id}`, {
      method: 'GET',
    }).then(responseHandler);
  };

  getBalance = async (id: string) => {
    return fetch(`${this.link}/balance?id=${id}`, {
      method: 'GET',
    }).then(responseHandler);
  };

  getDialogs = async (id: string) => {
    return fetch(`${this.link}/user/dialogs?id=${id}`, {
      method: 'GET',
    }).then(responseHandler);
  }

  syncDialogs = async (data: any) => {
    return fetch(`${this.link}/user/dialogs/synch`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(responseHandler);
  };

  addBalance = async (amount: number, id: string) => {
    return fetch(`${this.link}/balance/add`, {
      method: 'POST',
      body: JSON.stringify({
        amount,
        id,
      }),
    }).then(responseHandler);
  };

  sendMessages = async (data: IMessagesRequest) => {
    return fetch(`${this.link}/user/chat`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  sendGooglePlayInstallReferrer = async ({
    ref,
    geo,
    id,
  }: {
    ref: string;
    geo: string;
    id: string;
  }) => {
    return fetch(`${this.linkStat}/`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'startParamsApp_raw',
        startParamsApp: ref,
        tid: id,
        geo: geo || '',
        platform: PLATFORM.ANDROID,
      }),
    });
  };

  sendComplaint = async ({
    dialog,
    id,
  }: {
    dialog: IDialog;
    id: string;
  }) => {
    return await fetch(`${this.link}/user/complaints`, {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        data: Base64.fromUint8Array(new TextEncoder().encode(JSON.stringify(dialog))),
        is_base64: 1,
      }),
    });
  };

  selectAssistantStatistics = async ({
    userId,
    assistantId,
  }: {
    userId: string;
    assistantId: AGENT_KEYS;
  }) => {
    return await fetch(`${this.link}/stats/assists/selected`, {
      method: 'POST',
      body: JSON.stringify({
        id: userId,
        assistantId,
      }),
    });
  };

  launchingStatistics = async ({
    bootId,
    data,
  }: {
    bootId: string;
    data?: string;
  }) => {
    return await fetch(`${this.link}/stats/launching`, {
      method: 'POST',
      body: JSON.stringify({
        bootId: bootId,
        data,
      }),
    });
  };


}

export const api = new Api();