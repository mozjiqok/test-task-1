import express from 'express';

const app = express();

const data = {
	goods:[
		{id:1,name:"Товар 1",cost:2000,price:2500,categ:1},
		{id:2,name:"Товар 2",cost:2200,price:2700,categ:2},
		{id:3,name:"Товар 3",cost:2200,price:2700,categ:3},
		{id:4,name:"Товар 4",cost:2200,price:2700,categ:4}
	],
	categs:[
		{id:1,name:"Категория 1"},
		{id:2,name:"Категория 2"},
		{id:3,name:"Категория 3"},
		{id:4,name:"Категория 4"}
	]
};

app.post('/*', (req, res) => {
	res.send(data);
});

app.listen(9000, () => console.log('Running on localhost:9000'));