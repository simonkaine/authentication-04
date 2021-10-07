const { Router } = require('express');
const Service = require('../services/user-service.js');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
    //   const email = req.body.email;
    //   const password = req.body.password;
      

      const signupObj = await Service.createUser(req.body);
      
      res.send(signupObj);
    } catch (error) {
      next(error);
    }
  });

