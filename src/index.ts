import './config/config';
import mongoose from 'mongoose';

import './models';

import { runBot } from './bot/bot';
// import { insertDataToDB } from './database/insertDataToDB';

const TOKEN = process.env.BOT_TOKEN || '';

const DB_URL = process.env.DB_URL || '';

mongoose.set({ strictQuery: true });

mongoose
	.connect(DB_URL, {
		dbName: 'films_catalog',
	})
	// for adding mock-data to DB
	// .then(() => {
	// 	insertDataToDB();
	// })
	.then(() => {
		console.log('Connection to the database was successful!');
	})
	.then(() => {
		runBot(TOKEN);
	})
	.catch(e => {
		console.log('DB connection error: ', e);
	});
