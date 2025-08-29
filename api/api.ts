import { Base64 } from 'js-base64';

import { IMessagesRequest } from '@/api/interfaces';
import { PLATFORM } from '@/services/constants';
import { IDialog } from '@/contexts/GlobalContext';

class Api {
  private link = 'https://app.neuronautica.com/api/v1';
  private linkStat = 'https://app.neuronautica.com/stats/save_db_apk.php';

  sendMessages = async (data: IMessagesRequest) => {
    return fetch(`${this.link}/`, {
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

    // console.log(JSON.stringify({
    //   tid: id,
    //   data: btoa(JSON.stringify(dialog)),
    //   eventTG: 'complaints',
    //   is_base64: 1,
    // }));
    return await fetch(`${this.link}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tid: id,
        data: Base64.encode(JSON.stringify(dialog)),
        eventTG: 'complaints',
        is_base64: 1,
      }),
    })
  }
}

export const api = new Api();