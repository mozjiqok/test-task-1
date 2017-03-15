import express from 'express';
import path from 'path';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import bodyParser from 'body-parser';

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
	}
});

app.listen(80, () => console.log('Running on localhost'));