var mongoose = require('mongoose');  
var AuthorSchema = new mongoose.Schema({  
  idname: String,
  password: String
});
mongoose.model('Author', AuthorSchema);

module.exports = mongoose.model('Author');