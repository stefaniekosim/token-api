var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var SecureKey = require('./ConfigController');
var Author = require('../models/author');
var ValidateToken = require('./ValidateToken');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    Author.findOneAndUpdate(
    {idname : req.body.idname},
    {
        idname : req.body.idname,
        password : hashedPassword
    },
    { 
        useFindAndModify:false,
        upsert:true
    }, 
    function (err, author) {
        if (err) {
            return res.status(500).send({respCode:'99',message:"Internal Server Error."});
        }else{
            res.status(200).send({ respCode:'0', message: "Idname succesfully registered." });
        }
    }) 
});

router.post('/login', SecureKey, function(req, res) {
    Author.findOne({idname: req.body.idname}, function (err, author) {
        if (err) {
            return res.status(500).send({ respCode:'99', message:'Internal Server Error.'});
        }
        if (!author) {
            return res.status(401).send({ respCode:'1' ,message: 'Idname / Password Incorrect.'});
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, author.password);
        if (!passwordIsValid) {
            return res.status(401).send({ respCode:'1', message: 'Idname / Password Incorrect.'});
        } else {
            var token = jwt.sign({ id: author._id}, req.keyvalue, {
                expiresIn: 3600 // expires in 1 hour
            });
            res.status(200).send({ respCode: '0', token: token });
        }
    });
});

router.get('/logout', function(req, res) {
    res.status(200).send({ respCode: '0', token: null });
});

router.get('/validate', ValidateToken, function(req, res, next) {
    Author.findById(req.id, {password: 0,_id:0},function (err, author) {
        if (err) {
            return res.status(500).send({ respCode:'99',message:'Internal Server Error.'});
        }
        if (!author) {
            return res.status(401).send({ respCode:'1',message:"Idname not registered."});
        }
        res.status(200).send({ respCode:'0',data:author});
    });
});

module.exports=router;