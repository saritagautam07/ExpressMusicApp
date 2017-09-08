// import the modules required in our program
var express = require('express');
var fs = require('fs');
var Player = require('player');

// initialize an express app
var app = express();

// declare public directory to be used as a store for static files
app.use('/public', express.static(__dirname + '/public'));


// make the default route to serve our static file
app.get('/',function(req,res){

	return res.redirect('/public/index.html');

});


app.get('/music', function(req,res){

	var fileId = req.query.id;
	var file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			//var rstream = fs.createReadStream(file);
			//rstream.pipe(res);
			var player = new Player('file');
			player.play(function(err, player){
              if (err) throw err
            })
		}
		else
		{
			res.send("Not found");
			res.end();
		}

	});
});


app.get('/download', function(req,res){
	var fileId = req.query.id;
	var file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	});
});

// start app on port 3000 and log the message to console

app.listen(3000,function(){
	console.log('App listening on port 3000!');
});