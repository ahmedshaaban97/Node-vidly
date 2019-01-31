const Joi = require('joi');
const express = require('express');
const Customer  = require('../models/Customer');
const router = express.Router();




router.get('/', async(req,res)=>{
    const customers = await Customer.find();
    res.send(customers);
});

router.post('/',async(req,res)=>{
   try {
       const data = req.body;
       let newCustomer = new Customer({
           name : data.name,
           isGold : data.isGold,
           phone : data.phone
       });
       newCustomer = await newCustomer.save();
       res.send(newCustomer);
   }catch (e) {
       console.log(e);
   }
});



module.exports = router;