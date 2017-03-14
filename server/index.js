import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import bodyParser from 'body-parser';

var url = 'mongodb://localhost:27017/test';

const app = express();
app.use(bodyParser.json());

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
	}
});

app.listen(9000, () => console.log('Running on localhost:9000'));