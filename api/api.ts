import { Base64 } from 'js-base64';

import { IMessagesRequest, IResponse, IResponseUserData } from '@/api/interfaces';
import { PLATFORM } from '@/services/constants';
import { IDialog } from '@/contexts/GlobalContext';
import { AGENT_KEYS } from '@/constants/agents-data';

class Api {
  private link = 'https://app.neuronautica.com/api/v2';
  private linkStat = 'https://app.neuronautica.com/stats/save_db_apk.php';


  async auth(token: string): Promise<IResponse<IResponseUserData>> {
    const res = await fetch(`${this.link}/app/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_token: token, mode: 'google' }),
    });

    if (!res.ok) {
      throw new Error(`Network error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as IResponse<IResponseUserData>;
    return data;
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
    code: string | number
  ): Promise<IResponse<IResponseUserData>> {
    const res = await fetch(`${this.link}/app/code/check?email=${email}&code=${code}`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(`Network error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as IResponse<IResponseUserData>;
    return data;
  }

  getInitData = async (id: string) => {
    return fetch(`${this.link}/app/init?id=${id}`, {
      method: 'GET',
    });
  };

  getBalance = async (id: string) => {
    return fetch(`${this.link}/balance?id=${id}`, {
      method: 'GET',
    });
  };

  addBalance = async (amount: number, id: string) => {
    return fetch(`${this.link}/balance/add`, {
      method: 'POST',
      body: JSON.stringify({
        amount,
        id,
      }),
    });
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
    userId,
    data,
  }: {
    userId: string;
    data?: string;
  }) => {
    return await fetch(`${this.link}/stats/launching`, {
      method: 'POST',
      body: JSON.stringify({
        id: userId,
        data,
      }),
    });
  };


}

export const api = new Api();