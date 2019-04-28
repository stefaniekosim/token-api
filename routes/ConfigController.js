var config = require('../models/config');

function getSecureKey(req, res, next) {
    config.findOne({key: "secretKey"}, function (err, config) {
        if (err || !config) {
            return res.status(500).send({ respCode: '99',message:'Internal Server Error.'});
        }
        req.keyvalue  = config._id.toString();
        next();
    });

};

module.exports = getSecureKey;