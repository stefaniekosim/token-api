var mongoose = require('mongoose');  
var ConfigSchema = new mongoose.Schema({  
  key: String,
  value: String
});
mongoose.model('Config', ConfigSchema);

module.exports = mongoose.model('Config');