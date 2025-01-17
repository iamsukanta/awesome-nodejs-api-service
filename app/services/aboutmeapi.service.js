const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../configs/jwt.configs.js');
// Import model
Aboutme = require('../models/aboutme.js');

module.exports = {
  list: (req, res) => {
    return Aboutme.find({})
    .sort({created_at: -1})
    .exec((err, aboutMeList) => {
      if (err) res.status(400).json(err);
      res.status(200).json({data: aboutMeList, success: true})
    });
  },

  latestAboutMe: (req, res) => {
    return Aboutme.findOne()
    .sort({ created_at: -1 })
    .exec((err, aboutme) => {
      if (err) res.status(400).json(err);
      res.status(200).json({data: aboutme, success: true});
    });
  },

  create: async (req, res) => {
    let aboutme = new Aboutme();
    aboutme.description = req.body.description;
    aboutme.image = req.file.filename;
    aboutme.created_by = req.user._id;
    return aboutme.save()
    .then(function(data) { 
      res.status(200).json({ message: "aboutme Link Successfully Created.", data: data}); 
    }).catch(err => {
      res.status(400).json({ message: err});
    });      
  },

  aboutmeDetails: async (req, res) => {
    let id = req.params.id;
    let aboutme = await Aboutme.findById(id);
    if(!aboutme) {
      return res.status(404).json({ message: 'Aboutme data not found.'})
    } else {
      return res.status(200).json({ data: aboutme });
    }
  },

  edit: async (req, res) => {
    let id = req.params.id;
    let aboutme = await Aboutme.findById(id);
    if(!aboutme) {
      return res.status(404).json({ message: 'Aboutme data not found.'})
    }

    aboutme.description = req.body.description;
    aboutme.image = req.file.filename;
    aboutme.created_by = req.user._id;
    return aboutme.save()
    .then(function(data) { 
      return res.status(200).json({ message: "Aboutme Link Successfully Created.", data: data}); 
    }).catch(err => {
      return res.status(400).json({ message: err});
    });      
  },

  delete: async (req, res) => {
    let id = req.params.id;
    let aboutme = await Aboutme.findById(id);
    if(!aboutme) {
      return res.status(404).json({ message: 'Aboutme data not found.'})
    } else {
      await aboutme.delete();
      return res.status(200).json({ message: 'Aboutme successfully deleted.' });
    }
  },
}
