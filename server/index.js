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
		res.status(400).send({errors: {email: "Неверный формат email"}});
		return false;
	}
	if((""+pass).length < 8){
		res.status(400).send({errors: {pass: "Пароль должен быть минимум 8 символов"}});
		return false;
	}
	if(pass !== conf){
		res.status(400).send({errors: {conf: "Пароль не совпадает с подтверждением"}});
		return false;
	}
	MongoClient.connect(url, (err, db) => {
		assert.equal(null, err);
		db.collection('users').find({email:email}).toArray((err,docs) => {
			assert.equal(null, err);
			if(docs.length > 0){
				res.status(400).send({errors: {email: "Пользователь с таким email уже зарегистрирован"}});
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
	const authToken = hat();
	db.collection('users').insertOne({email, passHash, authToken}, (err, result) => {
		assert.equal(err, null);
		db.close();
		res.send({authToken});
	});
}

var login = (email, pass, res) => {
	MongoClient.connect(url, (err, db) => {
		assert.equal(null, err);
		db.collection('users').find({email:email}).toArray((err,docs) => {
			assert.equal(err, null);
			if(docs.length === 0){
				res.status(400).send({errors: {email: "Пользователь с таким email не зарегистрирован"}});
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
				db.close();
				res.status(400).send({errors: {form: "Неверные данные"}});
			}
		});
	});
}

var resetPass = (email, res) => {
	MongoClient.connect(url, (err, db) => {
		assert.equal(null, err);
		db.collection('users').find({email:email}).toArray((err,docs) => {
			assert.equal(err, null);
			if(docs.length === 0){
				res.status(400).send({errors: {email: "Пользователь с таким email не зарегистрирован"}});
				db.close();
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
						res.status(400).send({errors: {form: "Не удалось отправить новый пароль на почту."}});
					}else{
						res.send({stts: "ok"});
					};
				});
			});
		});
	});
}

var authenticate = (req, res, next) => {
	if(!req.body.hasOwnProperty('f')){
		return false;
	}
	if([
		'fetch',
		'add_categ',
		'add_good',
		'del_categ',
		'del_good',
		'edit_good',
		'edit_user_info',
		'change_pass',
		'fetch_user'
	].indexOf(req.body.f) !== -1){
		const auth = req.headers['authorization'];
		const parts = auth.split(' ');
		if(parts.length !== 2){
			return false;
		}
		const [ email, token ] = parts;
		MongoClient.connect(url, (err, db) => {
			assert.equal(null, err);
			db.collection('users').find({email:email}).toArray((err,docs) => {
				assert.equal(null, err);
				if(docs.length === 0 || docs[0].authToken !== token){
					return false;
				}
				next();
			});
		});
	}
	else{
		next();
	}
}

var editUserInfo = (email, fname, lname, res) => {
	MongoClient.connect(url, (err, db) => {
		assert.equal(null, err);
		db.collection('users').updateOne({ email }, {$set:{fname, lname}}, (err, result) => {
			assert.equal(err, null);
			db.close();
			res.send({success: 'Информация успешно обновлена'});
		});
	});
}

var changePass = (email, oldp, newp, conf, res) => {
  if (("" + newp).length < 8) {
    res.status(400).send({errors: {newp: 'Пароль должен быть минимум 8 символов'}});
		return false;
  }
	else if (oldp === newp) {
    res.status(400).send({errors: {newp: 'Пароль не изменился'}});
		return false;
  }
  if (conf !== newp) {
    res.status(400).send({errors: {conf: 'Пароль не совпадает с подтверждением'}});
		return false;
  }
	MongoClient.connect(url, (err, db) => {
		assert.equal(null, err);
		db.collection('users').find({email:email}).toArray((err,docs) => {
			assert.equal(err, null);
			if(!bcrypt.compareSync(oldp, docs[0].passHash)){
				db.close();
				res.status(400).send({errors: {oldp: 'Неверный пароль'}});
				return false;
			}
			const newPassHash = bcrypt.hashSync(newp, 10);
			const authToken = hat();
			db.collection('users').updateOne({ email: email }, {$set:{passHash:newPassHash,authToken}}, (err, result) => {
				assert.equal(err, null);
				db.close();
				res.send({success:'Пароль успешно изменен',authToken});
			});
		});
	});
}

app.post('/*', authenticate, (req, res) => {
	switch(req.body.f){
		case 'fetch':
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				fetchData(db, res);
			});
			break;
		case 'add_categ':
			if(!req.body.hasOwnProperty('categ')){
				return false;
			}
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				addDoc(db, res, req.body.categ, 'categs');
			});
			break;
		case 'add_good':
			if(!req.body.hasOwnProperty('good')){
				return false;
			}
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				addDoc(db, res, req.body.good, 'goods');
			});
			break;
		case 'del_categ':
			if(!req.body.hasOwnProperty('categId')){
				return false;
			}
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				delCateg(db, res, req.body.categId);
			});
			break;
		case 'del_good':
			if(!req.body.hasOwnProperty('goodId')){
				return false;
			}
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				delDoc(db, res, req.body.goodId, 'goods');
			});
			break;
		case 'edit_good':
			if(!req.body.hasOwnProperty('good')){
				return false;
			}
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				editDoc(db, res, req.body.good, 'goods');
			});
			break;
		case 'reg_user':
			if(
				!req.body.hasOwnProperty('userData') ||
				!req.body.userData.hasOwnProperty('email') ||
				!req.body.userData.hasOwnProperty('pass') ||
				!req.body.userData.hasOwnProperty('conf')
			){
				return false;
			}
			var { email, pass, conf } = req.body.userData;
			validateRegisterData(email, pass, conf, res);
			break;
		case 'login':
			if(
				!req.body.hasOwnProperty('userData') ||
				!req.body.userData.hasOwnProperty('email') ||
				!req.body.userData.hasOwnProperty('pass')
			){
				return false;
			}
			var { email, pass } = req.body.userData;
			login(email, pass, res);
			break;
		case 'reset_pass':
			if(
				!req.body.hasOwnProperty('userData') ||
				!req.body.userData.hasOwnProperty('email')
			){
				return false;
			}
			var { email } = req.body.userData;
			resetPass(email, res);
			break;
		case 'edit_user_info':
			if(
				!req.body.hasOwnProperty('userData') ||
				!req.body.userData.hasOwnProperty('fname') ||
				!req.body.userData.hasOwnProperty('lname') ||
				!req.body.userData.hasOwnProperty('email')
			){
				return false;
			}
			var { email, fname, lname } = req.body.userData;
			editUserInfo(email, fname, lname, res);
			break;
		case 'fetch_user':
			MongoClient.connect(url, (err, db) => {
				assert.equal(null, err);
				const email = req.headers['authorization'].split(' ')[0];
				db.collection('users').find({email}).toArray((err,docs) => {
					assert.equal(null, err);
					const {fname, lname} = docs[0];
					res.send({fname, lname});
					db.close();
				});
			});
			break;
		case 'change_pass':
			if(
				!req.body.hasOwnProperty('userData') ||
				!req.body.userData.hasOwnProperty('oldp') ||
				!req.body.userData.hasOwnProperty('newp') ||
				!req.body.userData.hasOwnProperty('conf')
			){
				return false;
			}
			var { oldp, newp, conf } = req.body.userData;
			var email = req.headers['authorization'].split(' ')[0];
			changePass(email, oldp, newp, conf, res);
	}
});

app.listen(9000, () => console.log('Running on localhost:9000'));