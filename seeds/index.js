const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

const Campground = require('../models/campground');

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

const sample = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)];
};

const seedDB = async () => {
	await Campground.deleteMany({});

	for (let i = 0; i < 50; i++) {
		const rand1000 = Math.floor(Math.random() * 1000);
		const newCamp = new Campground({
			location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
		});
		await newCamp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
