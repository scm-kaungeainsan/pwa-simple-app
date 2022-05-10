const express = require('express');
const cors=require("cors");
var path = require('path');        
const port = process.env.PORT ||3000;   
const app = express();

//Set the base path to the angular-test dist folder
app.use(express.static(path.join(__dirname, '../dist')));
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))
app.set('view engine', 'pug');

//Any routes will be redirected to the angular app
app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../dist')});
});

//Starting server on port 8081
app.listen(port, () => {
    console.log('Server started!');
    console.log(port);
});