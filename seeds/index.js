const mongoose = require('mongoose');

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

const seedDB = async () => {
	await Campground.deleteMany({});
	const c = new Campground({ title: 'New Camp' });
	await c.save();
};

seedDB();
