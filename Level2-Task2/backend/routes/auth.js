const express = require('express');
const User = require('../models/User');
// const Candidate = require('../models/Candidate');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');

var jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = 'Aliyaisagoodgirl'

// ROUTE1: create a user using : POST "/api/auth/createuser" No login required
router.post('/createuser', [
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min: 5}),
], async (req, res) => {
   // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        // check wether the user with the same email exists already
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        
        res.json({authtoken})
        // res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})

// ROUTE2: authenticate a user using : POST "/api/auth/login" No login required
router.post('/login', [
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
], async (req, res) => {
    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        
        res.json({authtoken})
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}
);

// ROUTE3: get loggedin user details using: POST "/api/auth/getuser". login required
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("password")
        res.send(user) 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router