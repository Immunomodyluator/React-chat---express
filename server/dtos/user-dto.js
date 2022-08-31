export default class UserDto {
  email;
  id;
  login;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.login = model.login;
  }
}
