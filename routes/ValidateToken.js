var jwt = require('jsonwebtoken');
var config = require('../models/config');

function validateToken(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ respCode: '3', message: 'No token provided.' });
    }

    config.findOne({key: "secretKey"}, function (err, config) {
        if (err || !config) {
            return res.status(500).send({ respCode:'99',message:'Internal Server Error.'});
        }
        jwt.verify(token, config.value , function(err, decoded) {
            if (err) {
                return res.status(401).send({ respCode: '4', message: 'Failed to authenticate token.' });
            }else{
                req.id  = decoded.id;
                next();
            }
        });
    });
};

module.exports = validateToken;