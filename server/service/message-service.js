import messageModel from '../models/message-model.js';

export default class messageService {
  static async saveMessage(login, message) {
    return await messageModel.create({
      login,
      message
    });
  }

  static async getMessage() {
    const allMessage = await messageModel.find();
    return allMessage;
  }
}
