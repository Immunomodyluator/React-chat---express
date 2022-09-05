export default class MessageDto {
  id;
  login;
  date;
  message;

  constructor(model) {
    this.id = model._id.valueOf();
    this.login = model.login;
    this.date = model.date;
    this.message = model.message;
  }
}
