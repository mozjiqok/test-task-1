import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import bodyParser from 'body-parser';

var url = 'mongodb://localhost:27017/test';

const app = express();
app.use(bodyParser.json());

var fetchData = function(db, res) {
  db.collection('goods').find({}).toArray((err, docs) => {
    assert.equal(err, null);
		fetchCategs(db, res, docs);
  });
}

var fetchCategs = function(db, res, goods) {
  db.collection('categs').find({}).toArray((err, docs) => {
    assert.equal(err, null);
		db.close();
		res.send({goods:goods,categs:docs});
  });
}

app.post('/*', (req, res) => {
	if(!req.body.hasOwnProperty('f')){
		return false;
	}
	switch(req.body.f){
		case 'fetch':
			MongoClient.connect(url, function(err, db) {
				assert.equal(null, err);
				fetchData(db, res);
			});
	}
});

app.listen(9000, () => console.log('Running on localhost:9000'));