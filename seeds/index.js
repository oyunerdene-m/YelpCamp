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
		const price = Math.floor(Math.random() * 20) + 10;
		const newCamp = new Campground({
			location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			image: 'https://source.unsplash.com/collection/483251',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, praesentium excepturi sint vero quas doloribus voluptates, veniam facere tempore corrupti possimus pariatur mollitia ut? Nisi qui molestiae deserunt provident voluptates.',
			price: price,
		});
		await newCamp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
