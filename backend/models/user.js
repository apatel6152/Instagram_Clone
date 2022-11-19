const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    expireToken: Date,
    pic:{
        type:String,
        default:"https://res.cloudinary.com/amitinstagramclone/image/upload/v1668052670/default-profile-pic-e1513291410505_ffpe1d.jpg"
    },
    followers:[{
        type:ObjectId,
        ref:"USER"
    }],
    following:[{
        type:ObjectId,
        ref:"USER"
    }]
});

mongoose.model("USER", userSchema);