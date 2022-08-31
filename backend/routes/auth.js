const express = require('express');
const router=express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET= 'SexyCoders#@1'
const jwt = require('jsonwebtoken');

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
    //bcrypt hasing
    const salt = await bcrypt.genSalt(10);
    secPass=await bcrypt.hash(req.body.password,salt);
    //Create new User
    user= await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
    const data={
      user:{
        id:user.id
      }
    }
    const authToken=jwt.sign(data,JWT_SECRET)
    res.json({authToken})
})

module.exports=router