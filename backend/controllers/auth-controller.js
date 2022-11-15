const mongoose = require('mongoose');
const USER = mongoose.model("USER");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Jwt_secret} = require('../config/dev');

const signin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" })
    }
    USER.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email" })
            }
            bcrypt.compare(password, savedUser.password)
            .then((match) => {
                if (match) {
                    // return res.status(200).json({ message: "Signed in Successfully" });
                    const token = jwt.sign({ _id: savedUser.id }, Jwt_secret)
                    // const {_id, name, email,followers, following, pic} = savedUser;
                    res.json({token, savedUser})
                    console.log(token)
                } else {
                    return res.status(422).json({ error: "Invalid password" })
                }
            })
        .catch(err => console.log(err))
    })
}

const signup = (req, res) => {
    const { name, userName, email, password, pic} = req.body;
    if(!name ||  !userName || !email || !password) {
        return res.status(422).json({error: "please enter all required fields"})
    }

    USER.findOne({$or:[{email: email}, {userName: userName}]}).then((savedUser) => {
        if(savedUser) {
            return res.status(422).json({ error: "User already exists with that email and username"})
        }

        bcrypt.hash(password, 12).then((hashedPassword) => {
            const user = new USER({
                name,
                email,  
                userName, 
                password: hashedPassword,
                pic
            });
            
            user.save()
                .then(user => {
                    res.json({message:"saved successfully"});
                })
                .catch(err => {
                    console.log(err);
                }); 
        })
    })
}

exports.signin = signin;
exports.signup = signup;