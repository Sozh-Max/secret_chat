import { IMessagesRequest } from '@/api/interfaces';

class Api {
  private link = 'https://app.neuronautica.com/api/v1';

  sendMessages = async (data: IMessagesRequest) => {
    return fetch(`${this.link}/`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const api = new Api();