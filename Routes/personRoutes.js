const express = require("express");
const router = express.Router();
const person = require('../models/person')

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // create a newb person document using the mangoose model
    const newPerson = new person(data);

    // save the new data to tha database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server Error" });
  }
});

// get methos to get the person
router.get("/", async (req, res) => {
  try {
    const data = await person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server Error" });
  }
});

router.get("/:workType", async (req, res) => {
    try {
      const workType = req.params.workType;
      if (workType == "cheif" || workType == "waiter" || workType == "manager") {
        const response = await person.find({ work: workType });
        console.log("response fetched");
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: "invalid work type" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "internal server error" });
    }
  });

  router.put('/:id',async (req, res) => {
     try {
      const personId = req.params.id;
      const updatedPersonData = req.body

      const response = await person.findByIdAndUpdate(personId,updatedPersonData,{
        new: true,
        runValidators: true,
      })

      if(!response){
        return res.status(404).json({error: 'person not found'})
      }

      console.log('data is updated')
      res.status(200).json(response)
     } catch (err) {
      console.log(err);
      res.status(500).json({ error: "internal server error" });
     }
  })
  
  router.delete('/:id', async (req,res) => {
    try {
      const personId = req.params.id;
      const response = await person.findByIdAndDelete(personId)
      if(!response){
        return res.status(404).json({error: 'person not found'})
      }
      console.log('data deleted')
      res.status(200).json({messge: 'person deleted succesfully'})
    
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: "internal server error" });
    }
  })