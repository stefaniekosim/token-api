var app = require('./app');
var port = process.env.PORT || 14101;

var server = app.listen(port, function() {
  console.log('Authtoken server listening on port ' + port);
});