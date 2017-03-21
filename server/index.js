import express from 'express';
import path from 'path';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import hat from 'hat';
import nodemailer from 'nodemailer';

var url = 'mongodb://localhost:27017/test';

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/../build')));

var fetchData = (db, res) => {
  const cursor = db.collection('goods').find({});
	var docs = [];
	cursor.forEach((doc) => {
		docs.push(Object.assign({},doc,{id:doc._id,_id:undefined}));
  }, () => {
		fetchCategs(db, res, docs);
	});
}

var fetchCategs = (db, res, goods) => {
  const cursor = db.collection('categs').find({});
	var docs = [];
	cursor.forEach((doc) => {
		docs.push(Object.assign({},doc,{id:doc._id,_id:undefined}));
  },() => {
		db.close();
		res.send({goods:goods,categs:docs});
	});
}

var addDoc = (db, res, doc, collection) => {
	var cursor = db.collection(collection).find( {}, { _id: 1 } ).sort( { _id: -1 } ).limit(1);
	cursor.toArray((err,docs) => {
		assert.equal(err, null);
		var seq = (docs.length === 1 && !isNaN(docs[0]._id)) ? docs[0]._id + 1 : 1;
		doc._id = seq;
		db.collection(collection).insertOne(doc, (err, result) => {
			assert.equal(err, null);
			db.close();
			res.send({stts: 'ok', id: seq});
		});
	});
}

var delDoc = (db, res, docId, collection) => {
	db.collection(collection).deleteOne({ _id: docId }, (err, result) => {
		assert.equal(err, null);
    assert.equal(1, result.result.n);
		db.close();
		res.send({stts: 'ok'});
	});
}

var delCateg = (db, res, docId) => {
	db.collection('goods').updateMany({ categ: docId }, {$set:{categ:0}}, (err, result) => {
		assert.equal(err, null);
		delDoc(db, res, docId, 'categs');
	});
}

var editDoc = (db, res, doc, collection) => {
	db.collection(collection).updateOne({ _id: doc.id }, {$set:Object.assign(doc,{id:undefined})}, (err, result) => {
		assert.equal(err, null);
		db.close();
		res.send({stts: 'ok'});
	});
}

var validateRegisterData = (email, pass, conf, res) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(email)){
		res.send({error: "Неверный формат email"});
		return false;
	}
	if((""+pass).length < 8){
		res.send({error: "Пароль должен быть минимум 8 символов"});
		return false;
	}
	if(pass !== conf){
		res.send({error: "Пароль не совпадает с подтверждением"});
		return false;
	}
	MongoClient.connect(url, (err, db) => {
		assert.equal(null, err);
		db.collection('users').find({email:email}).toArray((err,docs) => {
			assert.equal(null, err);
			if(docs.length > 0){
				res.send({error: "Пользователь с таким email уже зарегистрирован"});
				db.close();
			}
			else{
				registerUser(email, pass, res, db);
			}
		});
	});
}

var registerUser = (email, pass, res, db) => {
	const passHash = bcrypt.hashSync(pass, 10);
	db.collection('users').insertOne({email, passHash}, (err, result) => {
		assert.equal(err, null);
		db.close();
		res.send({stts: 'ok'});
	});
}

var authenticateUser = (email, pass, res) => {
	MongoClient.connect(url, (err, db) => {
		assert.equal(null, err);
		db.collection('users').find({email:email}).toArray((err,docs) => {
			assert.equal(err, null);
			db.close();
			if(docs.length === 0){
				res.send({error: "Пользователь с таким email не зарегистрирован"});
				return false;
			}
			if(bcrypt.compareSync(pass, docs[0].passHash)){
				const authToken = hat();
				db.collection('users').updateOne({ email: email }, {$set:{authToken:authToken}}, (err, result) => {
					assert.equal(err, null);
					db.close();
					res.send({authToken: authToken});
				});
			}
			else{
				res.send({error: "Неверные данные"});
			}
		});
	});
}

var resetPass = (email) => {
	MongoClient.connect(url, (err, db) => {
		assert.equal(null, err);
		db.collection('users').find({email:email}).toArray((err,docs) => {
			assert.equal(err, null);
			db.close();
			if(docs.length === 0){
				res.send({error: "Пользователь с таким email не зарегистрирован"});
				return false;
			}
			const newPass = Math.random().toString(36).slice(-8);
			const newPassHash = bcrypt.hashSync(newPass, 10);
			db.collection('users').updateOne({ email: email }, {$set:{passHash:newPassHash,authToken:null}}, (err, result) => {
				assert.equal(err, null);
				db.close();
				var transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: 'fortestingreason@gmail.com', // Your email id
						pass: 'forTE$TING' // Your password
					}
				});
				const mailOptions = {
					from: '<fortestingreason@gmail.com>', // sender address
					to: email, // list of receivers
					subject: 'New password', // Subject line
					text: 'Ваш новый пароль: ' + newPass
				};
				transporter.sendMail(mailOptions, function(error, info){
					if(error){
						console.log(error);
						res.send({error: "Не удалось отправить новый пароль на почту."});
					}else{
						res.send({stts: "ok"});
					};
				});
			});
		});
	});
}

app.post('/*', (req, res) => {
	if(!req.body.hasOwnProperty('f')){
		return false;
	}
	switch(req.body.f){
		case 'fetch':
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				fetchData(db, res);
			});
		case 'add_categ':
			if(!req.body.hasOwnProperty('categ')){
				return false;
			}
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				addDoc(db, res, req.body.categ, 'categs');
			});
		case 'add_good':
			if(!req.body.hasOwnProperty('good')){
				return false;
			}
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				addDoc(db, res, req.body.good, 'goods');
			});
		case 'del_categ':
			if(!req.body.hasOwnProperty('categId')){
				return false;
			}
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				delCateg(db, res, req.body.categId);
			});
		case 'del_good':
			if(!req.body.hasOwnProperty('goodId')){
				return false;
			}
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				delDoc(db, res, req.body.goodId, 'goods');
			});
		case 'edit_good':
			if(!req.body.hasOwnProperty('good')){
				return false;
			}
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				editDoc(db, res, req.body.good, 'goods');
			});
		case 'regUser':
			var { email, pass, conf } = req.body;
			validateRegisterData(email, pass, conf, res);
		case 'logIn':
			var { email, pass } = req.body;
			authenticateUser(email, pass, res);
		case 'resetPass':
			var { email } = req.body;
			resetPass(email);
	}
});

app.listen(9000, () => console.log('Running on localhost:9000'));