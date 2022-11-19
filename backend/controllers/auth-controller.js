const mongoose = require('mongoose');
const USER = mongoose.model('USER');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Jwt_secret } = require('../config/dev');
const { sendgrid_api } = require('../config/dev');
const nodemailer = require('nodemailer');
const sendgridtransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridtransport({
    auth: {
      api_key: sendgrid_api,
    },
  })
);

const signin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: 'Please add email and password' });
  }
  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: 'Invalid email' });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          // return res.status(200).json({ message: "Signed in Successfully" });
          const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
          // const {_id, name, email,followers, following, pic} = savedUser;
          res.json({ token, savedUser });
          console.log(token);
        } else {
          return res.status(422).json({ error: 'Invalid password' });
        }
      })
      .catch((err) => console.log(err));
  });
};

const signup = (req, res) => {
  const { name, userName, email, password, pic } = req.body;
  if (!name || !userName || !email || !password) {
    return res.status(422).json({ error: 'please enter all required fields' });
  }

  USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then(
    (savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: 'User already exists with that email and username' });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new USER({
          name,
          email,
          userName,
          password: hashedPassword,
          pic,
        });

        user
          .save()
          .then((user) => {
            transporter.sendMail({
              to: user.email,
              from: 'apatel3031998@gmail.com',
              subject: 'Signup successfully',
              html: '<h1>Welcome to Instagram Clone</h1>',
            });
            res.json({ message: 'saved successfully' });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
};

const resetPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString('Hex');
    USER.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: 'User dont exists with that email' });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: 'apatel3031998@gmail.com',
          subject: 'password reset',
          html: `
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                     `,
        });
        res.json({ message: 'check your email' });
      });
    });
  });
};

const updatePassword = (req, res) => {
    const newPassword = req.body.password;
    const sentToken = req.body.token;
    USER.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"Password updated successfully"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
}

exports.signin = signin;
exports.signup = signup;
exports.resetPassword = resetPassword;
exports.updatePassword = updatePassword;