var mongoose = require('mongoose');  
var ConfigSchema = new mongoose.Schema({  
  key: String,
  value: String
});

var Config = mongoose.model("Config", ConfigSchema);

Config.findOneAndUpdate(
  {key : 'secretKey'},
  {key: 'secretKey' , value:'stfSecretKey'},
  { 
      useFindAndModify:false,
      upsert:true
  }, 
  function (err, author) {
      if (err) {
          console.log('error registerin token key');
      }
  }
)
module.exports = Config;