const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const Campground = require('./models/campground');

main().catch((err) => console.log(err));

async function main() {
	try {
		await mongoose.connect(
			'mongodb+srv://oyunerdene:oyukaoyuka26@mongo-lesson.deu0x.mongodb.net/campgroundApp?retryWrites=true&w=majority',
		);

		console.log('mongo connection open!!!');
	} catch (error) {
		handleError(error);
	}
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// //test route
// app.get('/makecamp', async (req, res) => {
// 	const camp = new Campground({ title: 'Green camp', description: 'Cheaper  campgroound!!' });
// 	await camp.save();
// 	res.send(camp);
// });

app.get('/', (req, res) => {
	res.render('home');
});

//index route
app.get('/campgrounds', async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', { campgrounds });
});

app.listen(3000, () => {
	console.log('App is listening oon port 3000!!');
});
