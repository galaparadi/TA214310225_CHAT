var app = require('express')();
var http = require('http').Server(app);

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 80;

http.listen(port, function () {
  console.log('listening on * : ' + port)
});
