const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exeption/api-errors');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('error ocures while validate ', errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshtoken', userData.refreshToken, {
        maxAge: 25 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); //store refreshtoken in cookie
      return res.json(userData);
    } catch (e) {
      next(e);
      console.log(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 25 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); //store refreshtoken in cookie
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
      console.log(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 25 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); //store
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
      //res.json(['123', '345']);
    } catch (e) {
      next(e);
    }
  }

  async getProducts(req, res, next) {
    try {
      const API_URL = 'https://fakestoreapi.com/products';
      fetch(API_URL)
        .then((res) => res.json())
        .then((json) => setTodo(json))
        .catch((error) => console.log(error.message));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
