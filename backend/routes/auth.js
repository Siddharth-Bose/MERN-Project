const express = require('express');
const router=express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// Create a User Using: POST "/api/auth", doesn't require auth
router.post('/',[
    body('name', 'Enter a valid Name').isLength({min:3}), 
    body('email','Enter a valid Email').isEmail(), 
    body('password', 'Enter a valid Password').isLength({ min: 5 })
],async (req,res)=>{
    // if any error is found, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check if user with this email already exists
    let user =await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:'Sorry a user with the email already exists'})
    }
    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
    res.json(user)
})

module.exports=router