import mongoose, { Schema } from 'mongoose';

const FilmSchema = new Schema({
	uuid: { type: String, required: true },
	name: { type: String, required: true },
	type: { type: String, required: true },
	year: { type: Number },
	rate: { type: Number },
	length: { type: String },
	country: { type: String },
	link: { type: String },
	picture: { type: String },
	cinemas: { type: [String], default: [] },
});

mongoose.model('films', FilmSchema);
