const express = require("express");

const User = require("../models");
module.exports.get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.send(user);
  } catch (e) {
    console.log(e);
  }
};
module.exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (e) {
    console.log(e);
  }
};

module.exports.signup = async (req, res) => {
  try {
    const user = new User(req.user);
    await user.save();
    return res.send(user);
  } catch (e) {
    console.log(e);
    res.send;
  }
};
module.exports.update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    return res.send(user);
  } catch (e) {
    console.log(e);
  }
};

module.exports.validate = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || email.length < 5) {
      return res.status(400).send({ message: "invalid email" });
    } else if (password < 6) {
      return res.status(400).send({ message: "invalid password" });
    }
    // to avoid conflict of emails
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      return res.status(409).send({ message: "email already exist" });
    }
    req.user = {
      email,
      password,
      username,
    };
    next();
  } catch (e) {
    res.status(500).send({ message: "internal server error" });
  }
};
