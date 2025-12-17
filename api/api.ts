import { Base64 } from 'js-base64';

import { IMessagesRequest, IResponseUserData } from '@/api/interfaces';
import { IDialog } from '@/contexts/GlobalContext';
import { AGENT_KEYS } from '@/constants/agents-data';

enum ErrorCodes {
  USER_WAS_REMOVE = 666,
}

const responseHandler = async (res: any) => {
  if (!res.ok) {
    let payload: any = null;

    try {
      payload = await res.json();
    } catch (e) {}

    const err: any = new Error(payload?.message || `HTTP ${res.status}`);
    if (payload) {
      err.payload = payload;
      Object.assign(err, payload);
    }

    err.status = res.status;

    throw err;
  }

  const data = await res.json().catch(() => null);
  return data?.data;
}

type LogoutFn = () => void;

export class Api {
  private link = 'https://app.neuronautica.com/api/v2';
  private readonly logout: LogoutFn;

  constructor(onUnauthorized: LogoutFn) {
    this.logout = onUnauthorized;
  }

  private errorHandler = (err: any) => {
    if (err?.error === ErrorCodes.USER_WAS_REMOVE) {
      this.logout();
    }
    throw err;
  }

  async auth(token: string, bootId: string): Promise<IResponseUserData> {
    return fetch(`${this.link}/app/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_token: token,
        mode: 'google',
        bootId,
      }),
    }).then(responseHandler).catch(this.errorHandler);
  }


  sendAuthorizeByEmail(email: string) {
    return fetch(`${this.link}/app/code/send`, {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
    });
  };

  async checkAuthorizeByEmail(
    email: string,
    code: string | number,
    bootId: string,
  ): Promise<IResponseUserData> {
    return fetch(`${this.link}/app/code/check?email=${email}&code=${code}&bootId=${bootId}`, {
      method: 'GET',
    }).then(responseHandler).catch(this.errorHandler);
  }

  getInitData = async (id: string) => {
    return fetch(`${this.link}/app/init?id=${id}`, {
      method: 'GET',
    }).then(responseHandler).catch(this.errorHandler);
  };

  getBalance = async (id: string) => {
    return fetch(`${this.link}/balance?id=${id}`, {
      method: 'GET',
    }).then(responseHandler).catch(this.errorHandler);
  };

  getDialogs = async (id: string) => {
    return fetch(`${this.link}/user/dialogs?id=${id}`, {
      method: 'GET',
    }).then(responseHandler).catch(this.errorHandler);
  }

  syncDialogs = async (data: any) => {
    return fetch(`${this.link}/user/dialogs/synch`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(responseHandler).catch(this.errorHandler);
  };

  addBalance = async (amount: number, id: string) => {
    return fetch(`${this.link}/balance/add`, {
      method: 'POST',
      body: JSON.stringify({
        amount,
        id,
      }),
    }).then(responseHandler).catch(this.errorHandler);
  };

  sendMessages = async (data: IMessagesRequest) => {
    return fetch(`${this.link}/user/chat`, {
      method: 'POST',
      body: JSON.stringify(data),
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

  removeDialog = async ({
    userId,
    assistantId,
  }: {
    userId: string;
    assistantId: AGENT_KEYS;
  }) => {
    return fetch(`${this.link}/user/dialogs/delete`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: userId,
        assistantId,
      }),
    }).then(responseHandler).catch(this.errorHandler);
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