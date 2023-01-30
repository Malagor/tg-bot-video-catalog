import TelegramBot from 'node-telegram-bot-api';
import { FilterQuery } from 'mongoose';
import { getFilms } from '../database/DB.service';
import { sendHTML } from './utils';
import { formatFilmListToHTML } from '../formatters/film.formatters';
import { isNoEmptyArray } from './type-guards';

export async function getFilmsAndSendMessage<T>(
	bot: TelegramBot,
	chatId: number,
	query: FilterQuery<T>
): Promise<void> {
	const films = await getFilms(query);

	const html = isNoEmptyArray(films) ? formatFilmListToHTML(films) : 'Нет фильмов по вашему запросу.';

	await sendHTML({ bot, chatId, content: html, keyboardName: 'films' });
}
