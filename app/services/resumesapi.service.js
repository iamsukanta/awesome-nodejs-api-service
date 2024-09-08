const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../configs/jwt.configs.js');
// Import model
Resume = require('../models/resume.js');

module.exports = {
  list: (req, res) => {
    return Resume.findOne({})
      .sort({ created_at: -1 })
      .exec((err, portfolios) => {
        if (err) res.status(400).json(err);
        res.status(200).json({ data: portfolios, success: true });
      });
  },

  create: async (req, res) => {
    console.log(req.body, "dd");
    var resume = new Resume();
    resume.url = req.body.url;
    resume.created_by = req.user._id;
    return resume
      .save()
      .then(function (data) {
        res
          .status(200)
          .json({ message: "Resume Link Successfully Created.", data: data });
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  },
};
