import mongoose, { FilterQuery } from 'mongoose';
import { ICinema, IFilm, IUser } from '../types';

const Film = mongoose.model('films');

const Cinema = mongoose.model('cinemas');

const User = mongoose.model('users');

export function getFilms<T>(query: FilterQuery<T>): Promise<IFilm[] | void> {
	return Film.find(query).catch(e => {
		console.log('Не могу получить список фильмов', e);
		return [];
	});
}

export function getOneFilm<T>(query: FilterQuery<T>): Promise<IFilm | void> {
	return Film.findOne(query).catch(e => {
		console.log('Не могу получить информацию о фильме', e);
		return {};
	});
}

export async function getCinemas<T>(query: FilterQuery<T>): Promise<ICinema[] | void> {
	return Cinema.find(query).catch(e => {
		console.log('Не могу получить список кинотеатров', e);
		return [];
	});
}

export async function getOneCinema<T>(query: FilterQuery<T>): Promise<ICinema | void> {
	return Cinema.findOne(query).catch(e => {
		console.log('Не могу получить информацию о кинотеатре', e);
		return {};
	});
}

export async function getUser<T>(query: FilterQuery<T>): Promise<IUser> {
	return User.findOne(query).catch(e => {
		console.log('Не удалось получить информацию об пользователе', e);
		return {};
	});
}
