import '../models/film.model';
import '../models/cinema.model';

import mongoose from 'mongoose';

import database from './database.json';
export function insertDataToDB() {
	const Film = mongoose.model('films');
	const Cinema = mongoose.model('cinemas');

	console.log(database.films);
	if (database.films) {
		database.films.forEach(f => {
			new Film(f)
				.save()
				.then(() => {
					console.log('Данные сохранены в Базу данных');
				})
				.catch((e: Error) => {
					console.log(e);
				});
		});
	}

	if (database.cinemas) {
		database.cinemas.forEach(c => {
			new Cinema(c)
				.save()
				.then(() => {
					console.log('Данные сохранены в Базу данных');
				})
				.catch((e: Error) => {
					console.log(e);
				});
		});
	}
}
