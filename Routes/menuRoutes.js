const express = require('express')
const router = express.Router();
const menu = require('../models/menu')


// post methid to add a menu items
router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new menu(data);
      const response = await newMenu.save();
      console.log("data saved");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "internal server error" });
    }
  });
  
  // get method to get the menu data
  router.get("/", async (req, res) => {
    try {
      const data = await menu.find();
      console.log("data fatched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "internal server error" });
    }
  });

  // comment add for menu perpose

  module.exports = router
  