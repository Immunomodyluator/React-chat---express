import messageService from '../service/message-service.js';
import MessageDto from '../dtos/message-dto.js';

export default class messageController {
  static async saveMessage(req, res, next) {
    try {
      console.log('1');
      const { login, message } = req.body;
      const newMessage = messageService.saveMessage(login, message);
      return res.send(newMessage);
    } catch (e) {
      next(e);
    }
  }

  static async getMessage(req, res, next) {
    try {
      let messageArr = [];
      const allMessage = messageService.getMessage();
      allMessage
        .then((result) => {
          result.map((message) => {
            messageArr.push(new MessageDto(message));
          });
          return res.send(messageArr);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      next(e);
    }
  }
}
