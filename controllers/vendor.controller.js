const express = require("express");
const Vendor = require("../models");
const logger = require("../service/logger.service");

module.exports.getAll = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.send(vendors);
  } catch (e) {
    logger.error(e.message, e.stack);
    console.log(e);
  }
};

module.exports.get = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.body.params);
    res.send(vendor);
  } catch (e) {
    logger.error(e.message, e.stack);
    console.log(e);
  }
};
module.exports.create = async (req, res) => {
  try {
    const Vendor = new Vendor(req.body);
    await vendor.save(vendor);
    res.send(vendor);
  } catch (e) {
    logger.error(e.message, e.stack);
    console.log(e);
  }
};
module.exports.update = async (req, res) => {
  try {
    const vendor = Vendor.findByIdAndUpdate(req.body.params, req.body);
    res.send(vendor);
  } catch (e) {
    logger.error(e.message, e.stack);
    console.log(e);
  }
};
