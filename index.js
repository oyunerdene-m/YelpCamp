const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home');
});

app.listen(3000, () => {
	console.log('App is listening oon port 3000!!');
});
