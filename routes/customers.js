
const express = require('express');
const {Customer,validate} = require('../models/Customer');
const router = express.Router();


router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const {error} = validate(data);
        if (error) return res.status(400).send(error.details[0].message);
        let newCustomer = new Customer({
            name: data.name,
            isGold: data.isGold,
            phone: data.phone
        });
        newCustomer = await newCustomer.save();
        res.send(newCustomer);
    } catch (e) {
        console.log(e);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const data = req.body;
        const {error} = validate(data);
        if (error) return res.status(400).send(error.details[0].message);
        let customer = await Customer.findOne({_id : req.params.id});
        customer.name = data.name;
        customer.isGold = data.isGold;
        customer.phone = data.phone;

        const newCustomer = await customer.save();
        res.send(newCustomer);


    }catch (e) {
        console.log(e)
    }
});


router.delete('/:id',async(req,res)=>{
    try {
        let customer = await Customer.findOne({_id: req.params.id});
        if (!customer) return res.status(404).send('customer with given ID was not found');
        let removedCustomer = await customer.remove();
        res.send(removedCustomer);
    }catch (e) {
        console.log(e);
    }
});



module.exports = router;