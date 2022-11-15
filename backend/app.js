const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const {mongoUrl} = require('./config/key');
const cors = require('cors');

app.use(cors());

require('./models/user');
require('./models/post');


app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

mongoose.connect(mongoUrl);

mongoose.connection.on("connected", ()=> {
    console.log("successfully connected to mongoDb");
});

mongoose.connection.on("error", ()=> {
    console.log("successfully not connected to mongoDb");
});

// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

app.listen(port, ()=> {
    console.log('server is listening on ' + port);
})