const express = require('express');
const router=express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// Create a User Using: POST "/api/auth", doesn't require auth
router.post('/',[
    body('name', 'Enter a valid Name').isLength({min:3}), 
    body('email','Enter a valid Email').isEmail(), 
    body('password', 'Enter a valid Password').isLength({ min: 5 })
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user => res.json(user)).catch(err=>console.log(err.message));
})

module.exports=router