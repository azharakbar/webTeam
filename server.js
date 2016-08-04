var express = require('express') ;
var app = express() ;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended :true }));
app.use(bodyParser.json());

var port = 12345 ;
app.use( express.static(__dirname + '/public') );

app.get('/' , function( req , res ){
	res.sendFile ('/home/user/qtracker/qtracker-internal/testfrontend/index.html')	;
}) ;

app.listen ( port , function(){
	console.log(`Server Listening To ${port}`);
}) ;