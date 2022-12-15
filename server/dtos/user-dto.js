//date transfer object
module.exports = class UserDto {
  email;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id; //mongo Use underscore for id
    this.isActivated = model.isActivated;
  }
};
