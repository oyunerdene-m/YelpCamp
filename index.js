const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
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
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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

//new route
app.get('/campgrounds/new', (req, res) => {
	res.render('campgrounds/new');
});

//create route
app.post('/campgrounds', async (req, res) => {
	const { campground } = req.body;
	const newCamp = new Campground(campground);
	await newCamp.save();
	res.redirect(`/campgrounds/${newCamp._id}`);
});

//edit route
app.get('/campgrounds/:id/edit', async (req, res) => {
	const { id } = req.params;
	const foundCamp = await Campground.findById(id);
	res.render('campgrounds/edit', { campground: foundCamp });
});

//update route
app.put('/campgrounds/:id', async (req, res) => {
	const { id } = req.params;
	const editedCamp = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
	res.redirect(`/campgrounds/${editedCamp._id}`);
});

//show route
app.get('/campgrounds/:id', async (req, res) => {
	const { id } = req.params;
	const camp = await Campground.findById(id);
	res.render('campgrounds/show', { campground: camp });
});

//delete route
app.delete('/campgrounds/:id', async (req, res) => {
	const { id } = req.params;
	await Campground.findByIdAndDelete(id);
	res.redirect('/campgrounds');
});

app.listen(3000, () => {
	console.log('App is listening on port 3000!!');
});
