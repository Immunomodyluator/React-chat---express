import $api from '../http';

export default class MessageService {
  static async sendMessage(login, message) {
    return $api.post('/saveMessage', { login, message });
  }

  static async getMessage() {
    return $api.get('/getMessage');
  }
}
