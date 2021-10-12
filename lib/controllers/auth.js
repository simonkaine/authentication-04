const { Router } = require('express');
const User = require('../models/users-model.js');
const Service = require('../services/user-service.js');

const DAY = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
    //   const email = req.body.email;
    //   const password = req.body.password;

      const signupObj = await Service.createUser({ ...req.body, titleOfRole: 'USER' });
      console.log(signupObj);
      res.cookie('session', signupObj.authToken(), {
        httpOnly: true,
        maxAge: DAY,
      });
      
      res.send(signupObj);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  })

  .post('/login', async (req, res, next) => {
    try {
    //   const email = req.body.email;
    //   const password = req.body.password;
      const logUser = await Service.authLogin(req.body);

      res.cookie('userId', logUser.id, {
        httpOnly: true,
        maxAge: DAY,
      });

      res.send(logUser);
    } catch (error) {
    //   If credentials are incorrect, return 401
      error.status = 401;
      next(error);
    }
  })

  .get('/me', async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const logUser = await User.getMeCookie(userId); // deconstruct cookies?

      res.send(logUser);
    } catch (error) {
      next(error);
    }
  });



 

