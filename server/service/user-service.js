const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exeption/api-errors');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with  ${email} allredy exist!`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); //hashing password
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    ); //send to mail activation  confirmation

    const userDto = new UserDto(user); // has 3 fields email, id, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken); // store in db refreshtoken

    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(activationLink) {
    const user = await UserModel.findOne({
      activationLink,
    });
    if (!user) {
      throw ApiError.BadRequest('incorrect activation link');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('user was not found');
    }
    const isPassEquals = bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('incorrect password or username');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken); // store in db refreshtoken

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}

module.exports = new UserService();
