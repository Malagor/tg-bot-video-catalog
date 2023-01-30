import TelegramBot, { CallbackQuery } from 'node-telegram-bot-api';
import { IQueryShowOneFilm } from '../../types';
import { getUser } from '../../database/DB.service';
import { getUserIdFromQuery } from '../../helpers/utils';
import { isUser } from '../../helpers/type-guards';
import mongoose from 'mongoose';

const User = mongoose.model('users');

export async function toggleFavorite(bot: TelegramBot, chatId: number, query: CallbackQuery): Promise<void> {
	if (!query.data) {
		return;
	}

	let data: IQueryShowOneFilm;

	try {
		data = JSON.parse(query.data);
	} catch (e) {
		console.log(`Data is not an object. ${e}`);
		return;
	}

	const telegramId = getUserIdFromQuery(query);
	const { filmUuid, isFav } = data;

	getUser({ telegramId })
		.then(user => {
			let userPromise;

			if (isUser(user)) {
				user.films = modifyFilmList(user.films, filmUuid, isFav);
				userPromise = user;
			} else {
				userPromise = createUser(telegramId, filmUuid);
			}

			userPromise.save().then(() => {
				bot.answerCallbackQuery(query.id, {
					text: isFav ? 'Удалено' : 'Добавлено',
				}).catch(e => {
					console.log(e);
				});
			});
		})
		.catch(e => {
			console.log(e);
		});
}

function removeFilmFromFavorite(films: Array<string>, filmUuid: string): string[] {
	return films.filter(fuuid => fuuid !== filmUuid);
}

function addFilmToFavorite(films: Array<string>, filmUuid: string): string[] {
	films.push(filmUuid);
	return films;
}

function createUser(telegramId: number, filmUuid: string) {
	return new User({
		telegramId,
		films: [filmUuid],
	});
}

function modifyFilmList(films: Array<string>, filmUuid: string, addFilm: boolean) {
	films = addFilm ? removeFilmFromFavorite(films, filmUuid) : addFilmToFavorite(films, filmUuid);

	return films;
}
