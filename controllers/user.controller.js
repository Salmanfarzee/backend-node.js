const express = require("express");

const bcrypt = require("bcryptjs");
const secretKey = "salman";

const User = require("../models");
const logger = require("../service/logger.service");
module.exports.get = async (req, res) => {
  try {
    logger.info("successful");
    const user = await User.findById(req.params.id);
    return res.send(user);
  } catch (e) {
    logger.error(e.message);
    console.log(e);
  }
};
module.exports.getAll = async (req, res) => {
  try {
    logger.info("successful");
    const users = await User.find();
    return res.send(users);
  } catch (e) {
    logger.error(e.message);
    console.log(e);
  }
};

module.exports.login = async (req, res) => {
  try {
    logger.info("successful");
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      return res.send({ message: "failed to login" });
    }
    const bcryptedPassword = bcrypt.hashSync(password, secretKey);
    const bcryptedUserPassword = bcrypt.hashSync(user.password, secretKey);
    if (bcryptedPassword != bcryptedUserPassword) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: 86400,
    });
    return res
      .status(200)
      .send({ message: "Logged in successfully", user, token });

    // } else if (!user) {
    //   res.send({ message: "failed to login" });
    // }
    // const user = new User(req.user);
    // await user.save();
    // return res.send(user);
  } catch (e) {
    logger.error(e.message);
    console.log(e);
    return res.send;
  }
};

module.exports.signup = async (req, res) => {
  try {
    logger.info("successful");
    user = new User({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, secretKey),
    });
    await user.save(user);

    return res
      .status(200)
      .send({ message: "Please check your mail to complete signup" });
  } catch (e) {
    logger.error(e.message);
    res.status(500).send({ message: "Some error has occured" });
  }
};

module.exports.update = async (req, res) => {
  try {
    logger.info("successful");
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    return res.send(user);
  } catch (e) {
    logger.error(e.message);
    console.log(e);
  }
};
module.exports.validateLogin = async (req, res, next) => {
  try {
    logger.info("successful");
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ message: "invalid email" });
    } else if (password < 6) {
      return res.status(400).send({ message: "invalid password" });
    }
    next();
  } catch (e) {
    logger.error(e.message);
    res.status(500).send({ message: "server error" });
  }
};
module.exports.validate = async (req, res, next) => {
  try {
    logger.info("successful");
    const { email, password, username } = req.body;
    if (!email || email.length < 5) {
      return res.status(400).send({ message: "invalid email" });
    } else if (password < 6) {
      return res.status(400).send({ message: "invalid password" });
    } else if (!username) {
      return res.send({ message: "no username!" });
    }
    // to avoid conflict of emails
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      return res.status(409).send({ message: "email already exist" });
    }
    // creating variable (user) and storing values of email,password,username
    req.user = {
      email,
      password,
      username,
    };

    next();
  } catch (e) {
    logger.error(e.message);
    res.status(500).send({ message: "internal server error" });
  }
};
