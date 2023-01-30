import TelegramBot, { SendMessageOptions, SendPhotoOptions } from 'node-telegram-bot-api';
import { sendHTML } from './utils';
import { getOneFilm, getUser } from '../database/DB.service';
import { FilterQuery } from 'mongoose';
import { IFilm, ISendPictureOptions } from '../types';
import { formatFilmCaption } from '../formatters/film.formatters';
import { ACTIONS } from '../bot/handlers/bot.constants';
import { isFilm, isUser } from './type-guards';

export async function getOneFilmAndSendMessage<T>(
	bot: TelegramBot,
	chatId: number,
	userId: number,
	query: FilterQuery<T>
): Promise<void> {
	const options: ISendPictureOptions = {
		bot,
		chatId,
		content: '',
		keyboardName: 'films',
	};

	let isFav = false;

	const filmInfo = await getOneFilm(query);

	if (!isFilm(filmInfo)) {
		options.content = 'Фильм не был найден';
		await sendHTML(options);
		return;
	}

	const user = await getUser({ telegramId: userId });
	if (isUser(user) && user.films.includes(filmInfo.uuid)) {
		isFav = true;
	}

	options.content = formatFilmCaption(filmInfo);
	options.picture = filmInfo.picture;

	await sendFilmInfo(filmInfo, isFav, options);
}

export async function sendFilmInfo(film: IFilm, isFav: boolean, options: ISendPictureOptions): Promise<void> {
	const { bot, chatId, content: caption, picture } = options;

	const option: SendPhotoOptions = {
		caption,
		parse_mode: 'HTML',
	};

	addKeyboardInFilm(option, film, isFav);

	await bot.sendPhoto(chatId, picture || '', option);
}

function addKeyboardInFilm(option: SendPhotoOptions | SendMessageOptions, film: IFilm, isFav: boolean): void {
	const favoriteText = isFav ? ' Удалить из избранного' : 'Добавить в избранное';

	option.reply_markup = {
		inline_keyboard: [
			[
				{
					text: favoriteText,
					callback_data: JSON.stringify({
						type: ACTIONS.ToggleFavorite,
						filmUuid: film.uuid,
						isFav: isFav,
					}),
				},
				{
					text: 'Кинотеатры',
					callback_data: JSON.stringify({
						type: ACTIONS.ShowCinemas,
						cinemaUuids: film.cinemas,
					}),
				},
			],
			[{ text: `Кинопоиск ${film.name}`, url: film.link }],
		],
		resize_keyboard: true,
	};
}
