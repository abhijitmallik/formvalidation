const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const Cookies = require("cookies");
const configFile = require('./config/serverConfig')
const config = {port:process.env.PORT || configFile.server.port,dbURL:configFile.dbURL};
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
const uristring = config.dbURL;
const User = require('./models/user.js');


mongoose.connect(uristring , function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      
      }
});

app.post('/user',function(req,res){
		let usr = req.body;
		User.create(usr,function(err,usr){
			if(err){
				throw err;
			}
			res.json({data:usr,status:true});
		})
});
server.listen(config.port,function(){
    console.log("application is listening on port",config.port);
})