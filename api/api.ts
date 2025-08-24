import { IMessagesRequest } from '@/api/interfaces';
import { PLATFORM } from '@/services/constants';

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
}

export const api = new Api();