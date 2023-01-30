import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
	telegramId: { type: Number, required: true },
	films: { type: [String], default: [] },
});

mongoose.model('users', UserSchema);
